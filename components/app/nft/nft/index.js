import NextLink from 'next/link'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import VerificationBadge from '../verification-badge'
import { useRef } from 'react'

export default function NFT({
  id,
  name,
  symbol,
  image,
  verified,
  serialNumber,
  supply,
  onSend,
}) {
  const imgRef = useRef(null)

  const handleError = () => {
    if (imgRef.current) {
      imgRef.current.src = '/nft_placeholder.png'
    }
  }

  function NFTViewer({ src }) {
    return (
      <img
        ref={imgRef}
        className="w-full h-full object-cover"
        src={src}
        alt="NFT content"
        onError={handleError}
      />
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: '0px 24px 48px -12px rgba(65, 65, 241, 0.1)' }}
    >
      <div className="w-full bg-gray-100" style={{ aspectRatio: '1' }}>
        <NFTViewer src={image} />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mt-2 text-sm mb-4">
          <div className="bg-gray-100 rounded-full text-gray-500 py-0.5 px-2 ">
            {supply}
          </div>
          <VerificationBadge verified={verified} />
        </div>
        <div className="text-gray-500 text-sm truncate">{symbol}</div>
        <div className="text-xl font-medium truncate">{name || symbol}</div>
        <div className="flex items-center mt-4 text-blue-500 gap-3">
          <NextLink href={`/app/nft/${id}?sn=${serialNumber}`}>
            <a className="flex-1 bg-gray-100 rounded-lg py-2 px-4 font-medium text-center flex items-center justify-center gap-2 truncate">
              Token Details
              <svg
                width="11"
                height="10"
                viewBox="0 0 11 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'translateY(0.1em)' }}
              >
                <path
                  d="M1.33398 9.16634L9.66732 0.833008M9.66732 0.833008H1.33398M9.66732 0.833008V9.16634"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </NextLink>
          <button
            className="border p-2 rounded-lg border-gray-100"
            style={{ aspectRatio: '1' }}
            onClick={() => onSend(id)}
          >
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
          </button>
        </div>
      </div>
    </div>
  )
}
