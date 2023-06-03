import { useEffect, useState } from 'react'
import React from 'react'
import Link from 'next/link'
import * as THREE from 'three'
import Button from '../../common/button'
import { Tooltip } from 'antd'
import Image from 'next/image'

export default function Hero() {
  const logos = [
    {
      link: "https://www.stastoken.com",
      img: "https://i.ibb.co/dQWzbnN/stas.png",
      alt: "Logo 3",
      title: "STAS Token",
    },
    {
      link: "https://www.my2cents.io",
      img: "https://i.ibb.co/JqFBC2Z/my2cents.png",
      alt: "Logo 4",
      title: "My2Cents",
    },
    {
      link: "https://www.bitcoinassociation.com",
      img: "https://i.ibb.co/6Wrjfj1/ba.png",
      alt: "Logo 5",
      title: "Bitcoin Association",
    },
    {
      link: "https://www.blockdojo.io",
      img: "https://i.ibb.co/QHMZBZ7/blockdojo.png",
      alt: "Logo 6",
      title: "Block Dojo",
    },
    {
      link: "https://www.musicart.io",
      img: "https://i.ibb.co/pWH2rqH/musicart.png",
      alt: "Logo 7",
      title: "MusicArt",
    },
    {
      link: "https://www.centi.ch",
      img: "https://i.ibb.co/V3twfgN/centi.png",
      alt: "Logo 8",
      title: "CENTI",
    },
    {
      link: "https://www.visely.com",
      img: "https://i.ibb.co/gyNGN10/visely.png",
      alt: "Logo 1",
      title: "Visely",
    },
    {
      link: "https://www.combatiq.com",
      img: "https://i.ibb.co/Jr7zWDj/iq.png",
      alt: "Logo 2",
      title: "Combatiq",
    },
    {
      link: "https://www.tegment.com",
      img: "https://i.ibb.co/Q8HpydD/tegment.png",
      alt: "Logo for Tegment",
      title: "Tegment",
    },
    {
      link: "https://www.mintelium.com",
      img: "https://i.ibb.co/37T4jH0/mintelium.png",
      alt: "Logo for Mintelium",
      title: "Mintelium",
    },
    {
      link: "https://www.gp.com",
      img: "https://i.ibb.co/5KrJ8pB/g-p.png",
      alt: "Logo for G&P",
      title: "G&P",
    },
    {
      link: "https://www.soundoshi.com",
      img: "https://i.ibb.co/vqX49f0/soundoshi.png",
      alt: "Logo for Soundoshi",
      title: "Soundoshi",
    },
    {
      link: "https://www.lilbit.com",
      img: "https://i.ibb.co/DKy0Q03/lilbit.png",
      alt: "Logo for Lilbit",
      title: "Lilbit",
    },
    {
      link: "https://www.spheretrax.com",
      img: "https://i.ibb.co/XbDqGxr/spheretrax.png",
      alt: "Logo for SphereTrax",
      title: "SphereTrax",
    },
  ];

  return (
    <div className="isolate">
      <div className="absolute inset-x-0 top-[-10rem] transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] z-0">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-40 sm:pb-40">
            <div>
              {/* <div className="hidden sm:mb-2 sm:flex sm:justify-center z-10">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-blue-600/10 hover:ring-gray-900/20">
                  <span className="text-gray-300">
                    Announcing our open source NFT exchange{' '}
                    <a href="#" className="font-semibold text-blue-500">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div> */}
              <div>
                <h1 className="text-4xl pb-2 font-bold tracking-tight sm:text-center sm:text-6xl z-20 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
                  The easiest way to manage your digital assets.
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400 sm:text-center">
                  Just one step to join the leading wallet & infrastructure
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Button
                    appearance="fat"
                    href="/app/wallet"
                    arrow="right"
                    gradientBg
                  >
                    Your wallet
                  </Button>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] z-0">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem] z-0"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fcca89" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-black/30 relative z-50">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="mb-5 mx-auto max-w-2xl text-lg leading-8 sm:text-center text-gray-300">
              Trusted by Bitcoin SV's leading companies
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7 mb-8">

            {logos.map((logo, index) => (
              <Link href={logo.link} target="_blank" rel="noopener noreferrer" className="relative block rounded-lg p-4 cursor-pointer aspect-ratio-square" key={index}>
                <Tooltip placement="top" title={logo.title}>
                  <div className='col-span-1 bg-gray-900 rounded-lg p-4  cursor-pointer'>
                    <div className='h-12 object-contain mx-auto aspect-ratio-square flex items-center justify-center'>

                      <Image priority={true} objectFit="contain" width={131} height={48} src={logo.img} alt={logo.alt} className="" />
                    </div>
                  </div>
                </Tooltip>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}
