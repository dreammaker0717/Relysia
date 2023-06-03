import { useState } from 'react'
import apiConfig from '@/config/relysiaApi'

export default function useRedeemToken() {
  const [loading, setLoading] = useState(false)

  async function redeemToken(tokenID, serialNumber, amount) {
    setLoading(true)
    let error
    let msg
    try {
      let res = await apiConfig.post('/v1/redeem', {
        dataArray: [
          {
            amount: 1,
            tokenId: tokenID,
            sn: serialNumber,
          },
        ],
      })
      msg = res?.data?.data?.msg || 'Operation completed successfully'
    } catch (e) {
      error = e
    }

    setLoading(false)
    return { error, msg }
  }

  return { redeemToken, loading }
}
