import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar'
import useTokens from '../../hooks/useTokens'
import InfiniteScroll from 'react-infinite-scroll-component'
import ErrorHandlingAvatar from '../app/nft/details/ErrorHandlingAvatar'

export default function TokenSideBar() {
  // var { walletStasTokens } = useSelector((state) => state.walletReducer)
  // const { userData } = useSelector((state) => state.authReducer)
  // useEffect(() => {
  //   if (userData) {
  //     checkStasTokensfromAPI(userData, dispatch)
  //   }
  // }, [userData])

  const { tokens, canLoadMore, loadMore } = useTokens()
  const router = useRouter()

  const renderValue = (token) => {
    if (!token.sn) {
      return token.amount
    }
    return `${token.supply - token.amount} / ${token.supply}`
  }

  return (
    <div
      id="scrollableDiv"
      className="flex flex-col h-[43em] overflow-y-scroll"
    >
      <InfiniteScroll
        dataLength={tokens.length}
        next={loadMore}
        hasMore={canLoadMore}
        loader={
          <div className="py-3">
            <div className="dots-loader"></div>
          </div>
        }
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.9}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-row justify-between items-end">
          <p className="wallet-head22 px-5">Tokens & NFTs</p>
        </div>
        {tokens &&
          tokens.map((ele, index) => {
            return (
              <div
                className="relative my-2 px-5 w-full transition-all duration-500 bg-[rgba(255,255,255,1)] hover:bg-[rgba(141,192,255,0.8)] rounded-[12px] h-[70px] flex items-center justify-between px-2"
                key={'wallet-stas-token' + index}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  router.push(`/app/nft/${ele.tokenId}?sn=${ele.sn}`)
                }
                value={ele.tokenId}
              >
                <div className="absolute right-2 top-[30%]">{ele.s} </div>
                <div>
                  <ErrorHandlingAvatar
                    alt={ele.symbol}
                    className="bg-blue-200"
                    src={ele.image}
                    key={`${ele.symbol}-${index}`} // Add a unique key here
                  />
                </div>
                <div className="ml-2 p-2">
                  <div className="font-bold">{ele.symbol}</div>
                  <div className="text-xs">{ele.protocol}</div>
                </div>
                <p className="tokens-count overflow-scroll">
                  {renderValue(ele)}
                </p>
              </div>
            )
          })}
      </InfiniteScroll>
    </div>
  )
}
