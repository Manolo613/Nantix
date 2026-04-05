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
        apr:                  parseFloat(r.borrowInfo.apy.formatted),
        ltv:                  parseFloat(r.supplyInfo.maxLTV.formatted),
        liquidationThreshold: parseFloat(r.supplyInfo.liquidationThreshold.formatted),
        live: true
      }
    }

    res.status(200).json({
      aave: {
        bitcoin:  getAsset('WBTC'),
        ethereum: getAsset('WETH'),
      },
      updatedAt: new Date().toISOString()
    })

  } catch (err) {
    console.error('Erreur API Aave:', err)
    res.status(500).json({ error: 'Impossible de récupérer les taux' })
  }
}
