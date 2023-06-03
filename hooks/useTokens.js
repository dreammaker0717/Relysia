import { useEffect, useState } from 'react'
import apiConfig from '@/config/relysiaApi'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'

export default function useTokens() {
  const { userData } = useSelector(authSelector)
  const [tokens, setTokens] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const { currentWalletId } = useSelector(walletSelector)

  const canLoadMore = Boolean(nextPageToken)
  async function fetchTokens() {
    setLoading(true)
    let headers = {}
    if (currentWalletId) headers.walletID = currentWalletId
    if (nextPageToken) headers.nextPageToken = nextPageToken
    const { data: { coins, meta: { nextPageToken: nextToken } } = {} } = (
      await apiConfig.get('/v2/balance', { headers })
    )?.data

    const stasTokens = coins.filter((coin) => coin.protocol === 'STAS')
    setNextPageToken(nextToken)
    setLoading(false)
    return stasTokens
  }

  async function loadMore() {
    // loadMore fetch more token & nfts if has next page token
    // and merged new chunk of tokens with the existing chunk
    if (canLoadMore) {
      const moretokens = await fetchTokens()
      setTokens((prev) => prev.concat(moretokens))
    }
  }

  useEffect(() => {
    if (!userData) return

    // runs on first load of hook and whenever user or
    // currentwalletId changes
    fetchTokens().then((res) => setTokens(res))
  }, [userData, currentWalletId])

  return { tokens, canLoadMore, loadMore, loading }
}
