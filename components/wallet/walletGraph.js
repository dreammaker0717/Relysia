// import React, { useState, useEffect, useLayoutEffect } from 'react'

// import { createTheme } from '@material-ui/core/styles'

// const WalletGraph = (props) => {
//   return (
//     <div className="">
//       {' '}
//
//     </div>
//   )
// }

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ChatPage } from '../aichat'
import Title from '../common/title'
import { Fragment } from "react"
import Dialog from '@material-ui/core/Dialog'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { IconButton, Slide } from '@material-ui/core'
import { toast } from 'react-toastify'
import { multiFactor } from 'firebase/auth'
import { firebaseAuthFunc } from '@/config/init'
import { useRouter } from 'next/router'

const Card = ({ label, onClick }) => (
  <div
    className="flex-1 p-4 rounded-md hover:shadow-md cursor-pointer bg-white hover:delay-150 hover:duration-300 text-center"
    onClick={onClick}
  >
    <img
      src={
        label === 'Exchange'
          ? '/assets/images/exchange2.png'
          : label === 'Topup'
          ? '/assets/images/topup.png'
          : '/assets/images/mirroredGiftCard.png'
      }
      className="w-full"
    />
    <p className="text-lg font-bold">{label}</p>
  </div>
)

const FullWidthComponent = ({ children }) => (
  <div className="rounded-md w-full h-[305px] flex flex-wrap">{children}</div>
)

const Exchange = () => (
  <div className="h-full flex-1 p-0 rounded-md shadow-md cursor-pointer">
    <div className="flex-1 rounded-md cursor-pointer">
      <iframe
        id="#stealthex-widget"
        src="https://stealthex.io/widget/1234100e-8ded-49b4-87c2-f9be67cc134b"
        style={{
          border: 'none',
          borderRadius: '0px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '720px',
          height: '305px',
        }}
      />
    </div>
  </div>
)

async function fetchTopupUrl(paymail, email) {
  const response = await fetch(
    `/api/topup?PAYMAIL=${encodeURIComponent(
      paymail,
    )}&EMAIL=${encodeURIComponent(email)}`,
  )

  if (response.ok) {
    const data = await response.json()
    console.log('url')
    console.log(data.url)
    return data.url
  } else {
    throw new Error(`Request failed with status ${response.status}`)
  }
}

const Topup = ({ url }) => (
  <div className="h-full flex-1 p-0 rounded-md shadow-md cursor-pointer">
    <div className="flex-1 rounded-md cursor-pointer">
      <iframe
        id="#centi-widget"
        src={url}
        style={{
          border: 'none',
          borderRadius: '0px',
          overflow: 'hidden',
          width: '100%',
          height: '305px',
        }}
      />
    </div>
  </div>
)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const Giftcards = ({ setSupportState, supportState }) => {
  return (
    <Dialog
      open={supportState}
      TransitionComponent={Transition}
      as="div"
      onClose={() => {
        setSupportState(!setSupportState)
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        paper: `relative pt-10 px-8 bg-gray-100  flex flex-col justify-between items-center h-[78%] max-h-[600px] md:h-[90%] md:max-h-[700px]  mb-[100px] md:mb-0 mt-[64px] md:mt-0 rounded-[26px]`,
      }}
      fullWidth
      maxWidth="sm"
    >
      <div className=" hover:opacity-90 space-x-2 absolute left-4 top-4 flex items-center cursor-pointer ">
        <div className="pb-1">Support</div>
      </div>
      <div className="absolute right-2 top-1.5 flex items-center">
        <IconButton
          onClick={() => {
            setSupportState(!supportState)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconButton>
      </div>
      <ChatPage />
    </Dialog>
  )
}

const TopupDialog = ({ setTopupState, topupState }) => {
  const router = useRouter()
  return (
    <Dialog
      open={topupState}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setTopupState(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      style={{ zIndex: 1000 }}
      classes={{
        paper: `relative mb-[100px] bg-red-100 md:mb-0 mt-[64px] md:mt-0 rounded-[26px] pt-10 px-8 md:px-18 flex flex-col items-start`,
      }}
      fullWidth
      maxWidth="sm"
    >
      <div class="flex px-4 mb-4 text-sm text-black rounded-lg" role="alert">
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="#c74444"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Danger</span>
        <div>
          <span class="font-semibold text-base">
            To Perform this operation MFA must be enabled
          </span>
        </div>
      </div>
      <div className="w-full mt-2 flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0 pb-2">
        <div className="max-w-xs">
          <MaterialUiCustomButtom
            label="Not Yet"
            className
            onClick={() => setTopupState(false)}
            background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
            type="button"
          />
        </div>
        <div className="max-w-xs">
          <MaterialUiCustomButtom
            label="Confirm"
            onClick={() => router.push('/app/settings?current=4')}
            type="button"
          />
        </div>
      </div>
    </Dialog>
  )
}

const Ntfs = () => (
  <div className="h-full flex-1 p-4 rounded-md shadow-md cursor-pointer">
    <p className="text-lg font-bold">Nfts</p>
    <p className="text-sm text-gray-500"> coming soon </p>
  </div>
)
const switchEle = (selectedCard, topupUrl) => {
  switch (selectedCard) {
    case 'Exchange':
      return <Exchange />
    case 'Topup':
      return <Topup url={topupUrl} />
    case 'Nfts':
      return <Ntfs />
  }
}

const WalletGraph = ({ userData, walletAddress }) => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [topupUrl, setTopupUrl] = useState(null)
  const [supportState, setSupportState] = useState(false)
  const [topupState, setTopupState] = useState(false)

  useEffect(() => {
    if (document.getElementById('cards'))
      document.getElementById('cards').onmousemove = (e) => {
        for (const card of document.getElementsByClassName('card')) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top

          card.style.setProperty('--mouse-x', `${x}px`)
          card.style.setProperty('--mouse-y', `${y}px`)
        }
      }
  }, [selectedCard])

  useEffect(() => {
    if (selectedCard === 'Topup') {
      fetchTopupUrl(walletAddress?.paymail, userData?.email)
        .then((url) => setTopupUrl(url))
        .catch((error) => console.error(error))
    }
  }, [selectedCard])

  const handleTopupClick = () => {
    if (multiFactor(firebaseAuthFunc?.currentUser).enrolledFactors.length > 0) {
      setSelectedCard('Topup')
      return
    }
    setTopupState(true)
  }
  return (
    <>
      {selectedCard ? (
        <FullWidthComponent>
          <button
            className="position-absolute top-0 right-0 w-6 h-6 text-black"
            onClick={() => setSelectedCard(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {switchEle(selectedCard, topupUrl)}
        </FullWidthComponent>
      ) : (
        <div className="md:h-[100%] flex flex-wrap gap-x-4">
          <div className="grid grid-cols-12 w-full gap-2" id="cards">
            <div
              onClick={() => setSelectedCard('Exchange')}
              className="sm:col-span-4 col-span-12 w-full  card  rounded-lg relative shadow-md cursor-pointer  flex justify-start items-end"
            >
              <div class="card-content w-full h-full justify-start items-end">
                <div className="p-4 w-full relative z-50 ">
                  <Title
                    optimised={true}
                    classNames="text-blue-900 font-extrabold text-2xl"
                  >
                    Exchange
                  </Title>
                </div>
                <Image
                  alt="Exchange"
                  quality={100}
                  loading={'eager'}
                  priority
                  objectFit="cover"
                  layout="fill"
                  className=""
                  style={{ borderRadius: '8px' }}
                  src="/images/wallet/content.webp"
                />
              </div>
            </div>
            <div
              onClick={handleTopupClick}
              className="sm:col-span-8 col-span-12  card rounded-lg shadow-md  relative  flex justify-start items-end cursor-pointer"
            >
              <div class="card-content w-full h-full justify-start items-end">
                <div className="p-4 w-full relative z-50 ">
                  <Title
                    optimised={true}
                    classNames="text-blue-900 font-extrabold text-2xl"
                  >
                    Topup
                  </Title>
                  <p className="text-black leading-5 w-1/3">
                    Quickly add Bitcoin SV to your wallet.
                  </p>
                </div>
                <Image
                  alt="Topup"
                  quality={100}
                  loading={'eager'}
                  priority
                  objectFit="cover"
                  layout="fill"
                  className=""
                  style={{ borderRadius: '8px' }}
                  src="/images/wallet/content-1.webp"
                />
              </div>
            </div>
            <div
              onClick={() => window.open('https://www.nftana.com', '_blank')}
              className="sm:col-span-8 col-span-12  card rounded-lg relative shadow-md cursor-pointer  flex justify-start items-end"
            >
              <div class="card-content w-full h-full justify-start items-end">
                <div className="p-4 w-full relative z-50 ">
                  <Title
                    optimised={true}
                    classNames="text-blue-900 font-extrabold text-2xl"
                  >
                    NFTs
                  </Title>
                  <p className="text-black lg:w-1/2 leading-5">
                    Create, sell, buy, and exchange rare next-gen NFTs.
                  </p>
                </div>
                <Image
                  alt="NFTs"
                  quality={100}
                  loading={'eager'}
                  priority
                  objectFit="cover"
                  layout="fill"
                  className=""
                  style={{ borderRadius: '8px' }}
                  src="/images/wallet/content-2.webp"
                />
              </div>
            </div>
            <div
              onClick={() => setSupportState(true)}
              className="sm:col-span-4 col-span-12  card rounded-lg relative shadow-md cursor-pointer  flex justify-start items-end"
            >
              <div class="card-content w-full h-full justify-start items-end">
                <div className="p-4 w-full relative z-50 ">
                  <Title
                    optimised={true}
                    classNames="text-blue-900 font-extrabold text-2xl"
                  >
                    Support
                  </Title>
                </div>
                <Image
                  alt="Gift-Card"
                  quality={100}
                  loading={'eager'}
                  priority
                  objectFit="cover"
                  layout="fill"
                  className=""
                  style={{ borderRadius: '8px' }}
                  src="/images/wallet/content-3.webp"
                />
              </div>
            </div>
            <Giftcards
              setSupportState={setSupportState}
              supportState={supportState}
            />
            <TopupDialog
              setTopupState={setTopupState}
              topupState={topupState}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default WalletGraph
