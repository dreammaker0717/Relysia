import Breadcrumbs from 'components/app/breadcrumbs'
import VerificationBadge from 'components/app/nft/verification-badge'
import { useRouter } from 'next/router'
import useToken from '../../../../hooks/useTokenDetails'
import DestroyTokenModal from 'components/app/nft/destroy-token-modal'
import { useState, useRef } from 'react'
import TransactionTabs from 'components/app/nft/details/transaction-tabs'

export default function NFTDetails() {
  const [openDestroyTokenModal, setOpenDestroyTokenModal] = useState(false)

  const { query } = useRouter()
  const { id, sn } = query
  const parsedSerialNumber = parseInt(sn)
  const serialNumberAvailable = !isNaN(parsedSerialNumber)
  const isNFT = serialNumberAvailable && parsedSerialNumber > 0

  const { token, loading, error } = useToken(id)
  const {
    token_id,
    symbol,
    description,
    image,
    schema_id,
    sats_per_token,
    total_supply,
    protocol,
    properties,
    issuance_txs = [],
    contract_txs = [],
  } = token

  const imgRef = useRef(null)

  const handleError = () => {
    if (imgRef.current) {
      imgRef.current.src = '/nft_placeholder.png'
    }
  }

  function Heading({ children }) {
    return <div className="text-gray-800 font-bold">{children}</div>
  }

  function Value({ children }) {
    return <div className="text-gray-500 break-words">{children}</div>
  }

  function Wrapper({ children }) {
    return <div className="flex flex-col">{children}</div>
  }

  if (loading) return null
  if (error)
    return (
      <div className="flex justify-center mt-20 text-2xl">
        <h2>
          We were unable to fetch token details at this time. Please try again
          later
        </h2>
      </div>
    )

  return (
    <div className="px-5 md:px-10 pb-40">
      <Breadcrumbs
        items={[
          isNFT ? { name: 'NFT', href: '/app/nft' } : undefined,
          { name: 'Details', href: `${token_id}-${symbol}?sn=${sn}` },
        ].filter(Boolean)}
        className="mb-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <div className="flex items-center pb-8">
            <div className="flex-1">
              <VerificationBadge verified={true} />
              <h1 className="font-semibold text-2xl mb-2 mt-4">{symbol}</h1>
              <p className="leading-tight text-gray-500 break-words">
                {description}
              </p>
            </div>
            {serialNumberAvailable && (
              <button
                className="text-white bg-red-500 rounded-lg py-2 px-3 font-medium"
                onClick={() => setOpenDestroyTokenModal(true)}
              >
                Destroy Token
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row border-t pt-8 gap-5">
            <div className="sm:w-1/2 space-y-5">
              <Wrapper>
                <Heading>Token_id</Heading>
                <Value>{token_id}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Symbol</Heading>
                <Value>{symbol}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Schema_id</Heading>
                <Value>{schema_id}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Protocol</Heading>
                <Value>{protocol}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Total supply</Heading>
                <Value>{total_supply}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Sats per token</Heading>
                <Value>{sats_per_token}</Value>
              </Wrapper>
            </div>
            <div className="sm:w-1/2 space-y-5">
              <Wrapper>
                <Heading>Properties</Heading>
                <Value>{JSON.stringify(properties)}</Value>
              </Wrapper>
              <Wrapper>
                <Heading>Contract txs</Heading>
                <Value>
                  {contract_txs.map((tx) => (
                    <div>{tx}</div>
                  ))}
                </Value>
              </Wrapper>
              <Wrapper>
                <Heading>Issuance txs</Heading>
                <Value>
                  {issuance_txs.map((tx) => (
                    <div>{tx}</div>
                  ))}
                </Value>
              </Wrapper>
            </div>
          </div>
        </div>

        <div>
          <img
            className="w-full max-w-lg rounded-2xl object-cover"
            src={image}
            ref={imgRef}
            style={{ aspectRatio: '1' }}
            onError={handleError}
          />
          <div
            className={`bg-blue-50 text-blue-500 rounded-full py-1 px-3 flex items-center gap-2 mt-8 text-sm font-medium`}
            style={{ width: 'fit-content' }}
          >
            <div className={`bg-blue-500 rounded-full w-2 h-2`} />
            Transactions
          </div>
          <TransactionTabs transactions={contract_txs} />
        </div>
      </div>

      <DestroyTokenModal
        open={openDestroyTokenModal}
        setOpen={setOpenDestroyTokenModal}
        tokenID={id}
        serialNumber={parsedSerialNumber}
        amount={total_supply}
      />
    </div>
  )
}
