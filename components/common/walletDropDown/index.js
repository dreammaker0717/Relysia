import { useState, useEffect, useRef } from 'react'
import { Tooltip } from 'antd'
import router from 'next/router'
import { CreatenewWallsetIcon } from '../../Layouts/WalletSVGIcons'
import { useMediaQuery } from '@material-ui/core'
import Image from 'next/image'

export default function WalletDropDown({ ...props }) {
  const [showDropdown, setShowDropdown] = useState(false);
  let isDown = false
  let startX
  let scrollLeft
  const onMouseDown = (e) => {
    isDown = true
    e.target.classList.add('active')
    startX = e.pageX - e.target.offsetLeft
    scrollLeft = e.target.scrollLeft
  }
  const onMouseUp = (e) => {
    isDown = false
    e.target.classList.remove('active')
  }
  const onMouseLeave = (e) => {
    isDown = false
    e.target.classList.remove('active')
  }
  const onMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - e.target.offsetLeft
    const walk = (x - startX) * 3 //scroll-fast
    e.target.scrollLeft = scrollLeft - walk
  }

  const handleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  const isMobile = useMediaQuery('(max-width:700px)')

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className={'flex gap-1' + (isMobile ? " justify-center pl-12" : "")}>
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className={props.className}
        style={{
          position: 'relative',
        }}
      >
        <div>
          <button type="button" className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-base font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 min-w-[14rem] cursor-pointer fontSofiaPro" id="menu-button" onClick={handleDropdown}>
            {Object.values(props.walletData)?.find(
              (wallet) => wallet.walletID === props.currentWalletId,
            )?.walletTitle}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div
          className={"absolute top-9 z-[2000] mt-2 min-w-[14rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " + (showDropdown ? "block" : "hidden")}
          style={{
            maxHeight: isMobile ? 250 : 350,
            height: 'auto',
            scrollBehavior: 'smooth',
            overflowY:
              isMobile && props?.walletData?.length > 3
                ? 'scroll'
                : !isMobile && props?.walletData?.length > 8
                  ? 'scroll'
                  : 'unset',
            left: isMobile ? "50%" : 0,
            transform: isMobile ? "translateX(-50%)" : "",
          }}
        >
          <div className="py-1" role="none">
            {props.walletData &&
              props.walletData.map((tile, index) => {
                var activeState = tile.walletID === props.currentWalletId

                return (
                  <div
                    key={tile.walletID + 'fullcont' + index}
                    className='px-3 py-1 cursor-pointer transition-all duration-500 hover:bg-gray-100'
                    onClick={(e) => { props.onClick(e); setShowDropdown(false); }}
                    value={tile.walletID}
                  >
                    <div
                      key={tile.walletID + 'svgcontainer' + index}
                      className={'flex items-center gap-4 cursor-pointer'}
                    >
                      <div
                        key={tile.walletID + 'walletvg' + index}
                        className="walletSvg"
                      >
                        {tile.walletLogo &&
                          tile.walletLogo.includes('o/wallet_icons%2F') ? (
                          <Image alt={"wallet" + (index + 1)} height={35} width={35} objectFit='contain' priority={true} quality={100} src={tile.walletLogo} />
                        ) : (
                          <Image alt="default-wallet" height={35} width={35}
                            src={
                              'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletUUUIcon.svg?alt=media'
                            }
                          />
                        )}
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 400, cursor: 'default', marginBottom: 5 }}>
                        {tile.walletTitle ? (
                          tile.walletTitle
                        ) : (
                          <Skeleton.Button
                            active={true}
                            size="default"
                            shape="default"
                            block={true}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div >
      <Tooltip
        key={'createNewWalletIndextooltip'}
        placement="bottom"
        title={'create new wallet'}
      >
        <div
          key={'createNewWalletIndex'}
          className={'scrollbar-hidden ml-1'}
          style={{
            zIndex: '1023',
            boxShadow: '0 20 10px rgba(254, 44, 61, 0.1)',
            background: '',
            height: '100%',
            borderRadius: 18,
            position: 'relative',
            padding: '3px'
          }}
        >
          <div
            key={'createNewWalletIndexsvgcontainer'}
            className={'walletSvgContainer2 justify-center p-0'}
          >
            <div
              key={'createNewWalletIndexwalletvg'}
              onClick={() => {
                router.push(`/app/new-wallet`, undefined, { scroll: false })
              }}
              className="walletSvg"
            >
              {CreatenewWallsetIcon}
            </div>
          </div>
        </div>
      </Tooltip>
    </div>
  )
}
