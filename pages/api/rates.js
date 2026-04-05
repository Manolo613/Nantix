async function fetchAave() {
  const response = await fetch('https://api.v3.aave.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        markets(request: { chainIds: [1] }) {
          reserves {
            underlyingToken { symbol }
            supplyInfo {
              maxLTV { formatted }
              liquidationThreshold { formatted }
            }
            borrowInfo {
              apy { formatted }
            }
            isFrozen
          }
        }
      }`
    })
  })
  const { data } = await response.json()
  const reserves = data.markets[0].reserves

  const getBorrowRate = (symbol) => {
    const r = reserves.find(r =>
      r.underlyingToken.symbol === symbol &&
      !r.isFrozen &&
      r.borrowInfo !== null
    )
    return r ? parseFloat(r.borrowInfo.apy.formatted) : null
  }

  const getCollateral = (symbol) => {
    const r = reserves.find(r =>
      r.underlyingToken.symbol === symbol &&
      !r.isFrozen
    )
    if (!r) return null
    return {
      ltv: parseFloat(r.supplyInfo.maxLTV.formatted),
      liquidationThreshold: parseFloat(r.supplyInfo.liquidationThreshold.formatted),
    }
  }

  return {
    rates: {
      usdc: getBorrowRate('USDC'),
      usdt: getBorrowRate('USDT'),
    },
    collateral: {
      bitcoin:  getCollateral('WBTC'),
      ethereum: getCollateral('WETH'),
    }
  }
}

async function fetchMorpho() {
  // Query only the 4 markets we need directly by pair to avoid pagination issues
  // Market IDs verified live — sorted by liquidity (biggest/most active market per pair)
  // USDC/WBTC: 118M USDC  | USDC/WETH: 39M USDC
  // USDT/WBTC: 61M USDT   | USDT/WETH: 42M USDT
  // XRP: not available on Morpho (not an ERC-20 token)
  const MARKET_IDS = {
    'USDC/WBTC': '0x3a85e619751152991742810df6ec69ce473daef99e28a64ab2340d7b7ccfee49',
    'USDC/WETH': '0x94b823e6bd8ea533b4e33fbc307faea0b307301bc48763acc4d4aa4def7636cd',
    'USDT/WBTC': '0xa921ef34e2fc7a27ccc50ae7e4b154e16c9799d3387076c421423ef52ac4df99',
    'USDT/WETH': '0xdbffac82c2dc7e8aa781bd05746530b0068d80929f23ac1628580e27810bc0c5',
  }

  const fetchMarket = async (marketId) => {
    const res = await fetch('https://blue-api.morpho.org/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          marketById(marketId: "${marketId}", chainId: 1) {
            loanAsset { symbol }
            collateralAsset { symbol }
            lltv
            state { borrowApy supplyAssets }
          }
        }`
      })
    })
    const { data } = await res.json()
    return data.marketById
  }

  const [usdcWbtc, usdcWeth, usdtWbtc, usdtWeth] = await Promise.all([
    fetchMarket(MARKET_IDS['USDC/WBTC']),
    fetchMarket(MARKET_IDS['USDC/WETH']),
    fetchMarket(MARKET_IDS['USDT/WBTC']),
    fetchMarket(MARKET_IDS['USDT/WETH']),
  ])

  const getRate = (market) => {
    if (!market?.state?.borrowApy) return null
    return parseFloat((market.state.borrowApy * 100).toFixed(2))
  }

  const getCollateral = (market) => {
    if (!market?.lltv) return null
    const lltv = parseFloat((parseFloat(market.lltv) / 1e18 * 100).toFixed(1))
    return { ltv: lltv, liquidationThreshold: lltv }
  }

  return {
    rates: {
      usdc: { bitcoin: getRate(usdcWbtc), ethereum: getRate(usdcWeth) },
      usdt: { bitcoin: getRate(usdtWbtc), ethereum: getRate(usdtWeth) },
    },
    collateral: {
      bitcoin:  getCollateral(usdcWbtc),
      ethereum: getCollateral(usdcWeth),
    }
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  const [aaveResult, morphoResult] = await Promise.allSettled([
    fetchAave(),
    fetchMorpho(),
  ])

  const result = { updatedAt: new Date().toISOString() }

  if (aaveResult.status === 'fulfilled') {
    result.aave = aaveResult.value
  } else {
    console.error('Erreur API Aave:', aaveResult.reason)
  }

  if (morphoResult.status === 'fulfilled') {
    result.morpho = morphoResult.value
  } else {
    console.error('Erreur API Morpho:', morphoResult.reason)
  }

  if (!result.aave && !result.morpho) {
    return res.status(500).json({ error: 'Impossible de récupérer les taux' })
  }

  res.status(200).json(result)
}
