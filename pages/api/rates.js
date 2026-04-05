export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  try {
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

    const getAsset = (symbol) => {
      const r = reserves.find(r =>
        r.underlyingToken.symbol === symbol &&
        !r.isFrozen &&
        r.borrowInfo !== null
      )
      if (!r) return null
      return {
        ltv:                  parseFloat(r.supplyInfo.maxLTV.formatted),
        liquidationThreshold: parseFloat(r.supplyInfo.liquidationThreshold.formatted),
      }
    }

    // Taux d'emprunt USDC — c'est ce que les utilisateurs empruntent réellement
    const usdc = reserves.find(r =>
      r.underlyingToken.symbol === 'USDC' &&
      !r.isFrozen &&
      r.borrowInfo !== null
    )
    const usdcApr = usdc ? parseFloat(usdc.borrowInfo.apy.formatted) : null

    const wbtc = getAsset('WBTC')
    const weth = getAsset('WETH')

    res.status(200).json({
      aave: {
        bitcoin:  wbtc ? { apr: usdcApr, ltv: wbtc.ltv, liquidationThreshold: wbtc.liquidationThreshold, live: true } : null,
        ethereum: weth ? { apr: usdcApr, ltv: weth.ltv, liquidationThreshold: weth.liquidationThreshold, live: true } : null,
      },
      updatedAt: new Date().toISOString()
    })

  } catch (err) {
    console.error('Erreur API Aave:', err)
    res.status(500).json({ error: 'Impossible de récupérer les taux' })
  }
}
