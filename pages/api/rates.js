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
  const response = await fetch('https://blue-api.morpho.org/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        markets(where: { chainId_in: [1] }, first: 200) {
          items {
            loanAsset { symbol }
            collateralAsset { symbol }
            lltv
            state {
              borrowApy
              supplyAssets
            }
          }
        }
      }`
    })
  })
  const { data } = await response.json()
  const markets = data.markets.items.filter(m =>
    m.loanAsset && m.collateralAsset && m.state
  )

  const getBestMarket = (loanSymbol, collateralSymbol) => {
    const relevant = markets.filter(m =>
      m.loanAsset.symbol === loanSymbol &&
      m.collateralAsset.symbol === collateralSymbol &&
      m.state.borrowApy !== null &&
      m.state.supplyAssets !== null
    )
    if (!relevant.length) return null
    return relevant.sort((a, b) =>
      parseFloat(b.state.supplyAssets) - parseFloat(a.state.supplyAssets)
    )[0]
  }

  const getRate = (loanSymbol, collateralSymbol) => {
    const market = getBestMarket(loanSymbol, collateralSymbol)
    if (!market) return null
    return parseFloat((market.state.borrowApy * 100).toFixed(2))
  }

  const getCollateral = (collateralSymbol) => {
    const market = getBestMarket('USDC', collateralSymbol) || getBestMarket('USDT', collateralSymbol)
    if (!market) return null
    const lltv = parseFloat((parseFloat(market.lltv) / 1e27 * 100).toFixed(1))
    return { ltv: lltv, liquidationThreshold: lltv }
  }

  return {
    rates: {
      usdc: { bitcoin: getRate('USDC', 'WBTC'), ethereum: getRate('USDC', 'WETH') },
      usdt: { bitcoin: getRate('USDT', 'WBTC'), ethereum: getRate('USDT', 'WETH') },
    },
    collateral: {
      bitcoin:  getCollateral('WBTC'),
      ethereum: getCollateral('WETH'),
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
