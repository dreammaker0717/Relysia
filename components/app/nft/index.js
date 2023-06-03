import { useState } from 'react'
import NextLink from 'next/link'
import useNFTs from '../../../hooks/useNFTs'
import NFT from './nft'
import Breadcrumbs from '../breadcrumbs'
import WithdrawDialog from 'components/wallet/withdrawDialog'
import Loader from 'components/loader'
import VerifiedFilter from 'components/app/nft/verified-filter'
import SearchBar from 'components/app/search-bar'
import { useSelector } from 'react-redux'
import { checkTransactionsfromApi } from '@/axios-connect/wallet'
import walletSelector from '@/redux/selectors/wallet'

export default function NFTPage() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [sendTokenID, setSendTokenID] = useState()
  const [nextPageToken, setNextPageToken] = useState()
  const { nfts, canLoadMore, loadMore, loading } = useNFTs()

  const { currentWalletId, transactionHistory } = useSelector(walletSelector)

  const filteredTokens = nfts
    .filter(
      ({ listenerVerification }) =>
        true === (filter === 'Verified') || filter === 'All',
    )
    .filter(({ symbol }) => symbol.toLowerCase().includes(search.toLowerCase()))

  function handleSend(id) {
    setSendTokenID(id)
    setOpenDialog(true)
  }

  const refreshTransactions = () => {
    if (currentWalletId) {
      checkTransactionsfromApi(currentWalletId, nextPageToken, [
        transactionHistory[currentWalletId],
      ])
        .then((res) => {
          if (res.meta) {
            setNextPageToken(res.meta.nextPageToken)
          } else {
            setNextPageToken(null)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  function LoadMoreSection() {
    if (loading) return <Loader />
    if (canLoadMore)
      return (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMore}
            className="text-white rounded-lg py-2 px-5"
            style={{ background: 'var(--gradient)' }}
          >
            Load More
          </button>
        </div>
      )

    return null
  }

  function TokensGrid() {
    if (loading) return null
    if (nfts.length === 0)
      return (
        <div>
          You do not have any NFTs yet. All your minted NFTs will show up here
        </div>
      )
    if (filteredTokens.length === 0) return <div>No result found</div>
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-24">
        {filteredTokens.map(({ tokenId, image, name, symbol, sn, supply }) => (
          <NFT
            key={tokenId}
            id={tokenId}
            image={image}
            verified={true}
            name={name}
            symbol={symbol}
            serialNumber={sn}
            supply={supply}
            onSend={handleSend}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-5 md:p-10">
      <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-2">
        <div>
          <Breadcrumbs items={[{ name: 'NFT', href: 'nft' }]} />
          <h1 className="font-medium text-3xl">Gallery</h1>
          <p className="font-medium text-gray-500">
            {' '}
            Your current NFTs gallery
          </p>
        </div>
        <NextLink href="/app/mint">
          <a
            className="text-white px-3 py-2 rounded-lg flex items-center gap-2"
            style={{ background: 'var(--gradient)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 8.38h4.685c1.038 0 1.88.935 1.88 1.882 0 1.038-.842 1.88-1.88 1.88H9V8.381Z"
                stroke="#FF8A65"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 12.13h5.354c1.188 0 2.146.843 2.146 1.882 0 1.038-.958 1.88-2.146 1.88H9v-3.761ZM12.277 15.88v1.882M9.935 15.88v1.882M12.277 6.5v1.88M9.935 6.5v1.88M10.777 8.38H7.5M10.777 15.88H7.5"
                stroke="#FF8A65"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                stroke="#FF8A65"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              ></path>
            </svg>
            Mint
          </a>
        </NextLink>
      </div>

      <div className="mt-6 flex items-center justify-between mb-8 flex-wrap gap-5">
        <VerifiedFilter {...{ filter, setFilter }} />
        <SearchBar {...{ search, setSearch }} />
      </div>

      <TokensGrid />

      <LoadMoreSection />

      <WithdrawDialog
        dialogState={openDialog}
        setdialogState={setOpenDialog}
        preselectedTokenID={sendTokenID}
        refreshTransactions={refreshTransactions}
      />
    </div>
  )
}
