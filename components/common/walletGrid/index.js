import { Tooltip } from 'antd'
import router from 'next/router'
import { CreatenewWallsetIcon } from '../../Layouts/WalletSVGIcons'
import { useMediaQuery } from '@material-ui/core'
import Image from 'next/image'

export default function WalletGrids({ ...props }) {
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

  const isMobile = useMediaQuery('(max-width:700px)')

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={props.className}
      style={{
        width: '105%',
        height: 81,
        scrollBehavior: 'smooth',
        overflowX:
          isMobile && props?.walletData?.length > 3
            ? 'scroll'
            : !isMobile && props?.walletData?.length > 8
            ? 'scroll'
            : 'unset',
      }}
    >
      {props.walletData &&
        props.walletData.map((tile, index) => {
          var activeState = tile.walletID === props.currentWalletId

          return (
            <Tooltip
              key={tile.walletID + index}
              placement="bottom"
              title={tile.walletTitle}
            >
              <div
                key={tile.walletID + 'fullcont' + index}
                className={'scrollbar-hidden mx-1 first:ml-0 last:mr-0'}
                style={{
                  zIndex: '1023',
                  boxShadow: '0 20 10px rgba(254, 44, 61, 0.1)',
                  aspectRatio: '1/1',
                  background: activeState
                    ? 'linear-gradient(125deg, rgba(231,0,96,1) 0%, rgba(252,143,12,1) 100%) '
                    : '',
                  height: '100%',
                  borderRadius: 18,
                  position: 'relative',
                }}
              >
                <div
                  key={tile.walletID + 'svgcontainer' + index}
                  className={'walletSvgContainer'}
                >
                  <div
                    key={tile.walletID + 'walletvg' + index}
                    value={tile.walletID}
                    onClick={props.onClick}
                    className="walletSvg"
                  >
                    {tile.walletLogo &&
                      tile.walletLogo.includes('o/wallet_icons%2F') ? (
                      <Image alt={"wallet" + (index + 1)} height={60} width={60} objectFit='contain' priority={true} quality={100} src={tile.walletLogo} />
                    ) : (
                      <Image alt="default-wallet" height={60} width={60}
                        src={
                          'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletUUUIcon.svg?alt=media'
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </Tooltip>
          )
        })}
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
            aspectRatio: '1/1',
            background: '',
            height: '100%',
            borderRadius: 18,
            position: 'relative',
          }}
        >
          <div
            key={'createNewWalletIndexsvgcontainer'}
            className={'walletSvgContainer'}
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
