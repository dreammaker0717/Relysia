import React, { useState } from 'react'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import styles from './dashboardSidebar.module.css'

import {
  ConnectIcon,
  FriendsIcon,
  InfraStructureIcon,
  ManageIcon,
  MintIcon,
  NFTIcon,
  SettingsIcon,
  WalletIcon,
  ZapierIcon,
} from './SVGIcons'
import PricingTableModal from 'components/pricing/PricingTableModal'
import WithAuthProtection from '@/hooks/authProtection'
import dynamic from 'next/dynamic'
const AlertBanner = dynamic(() => import('../app/alertbanner/AlertBanner'))
const NavigationLink = dynamic(() => import('../app/navigationlink/NavigationLink'))

const { Sider } = Layout

function DashboardSidebar(props) {
  const isMobile = useMediaQuery('(max-width:768px)')
  const router = useRouter()
  const matchdesktop = window.innerWidth > 550
  const [collapsed, setcollapsed] = useState(matchdesktop ? false : true)
  const { walletData, currentWalletId } = useSelector(walletSelector)

  const [pricingPlanModalOpen, setPricingPlanModalOpen] = useState(false)

  function handleNoticeClick(event) {
    localStorage.setItem('release_noticed', true)

    event.target.style.display = 'none'
  }
  const navigation = [
    {
      href:"/app/wallet",
      text:"Wallet",
      icon:<WalletIcon />,
      condition:"app/wallet"
    },
    {
      href:"/app/nft",
      text:"NFT",
      icon:<NFTIcon />,
      condition:"nft"
    },
    {
      href:"/app/settings",
      text:"Settings",
      icon:<SettingsIcon />,
      condition:"app/settings"
    },
    {
      href:"/app/mint",
      text:"Mint",
      icon:<MintIcon />,
      condition:"app/mint"
    },
    {
      href:"/app/manage",
      text:"Manage",
      icon:<ManageIcon />,
      condition:"app/manage"
    },
    {
      href:"/app/friends",
      text:"Social",
      icon:<FriendsIcon />,
      condition:"app/friends"
    },
    {
      href:"/app/zaps",
      text:"Zapier",
      icon:<ZapierIcon />,
      condition:"app/zaps"
    },
    {
      href:"infrastructure",
      text:"Infrastructure",
      icon:<InfraStructureIcon />,
      condition:"infrastructure"
    },

  ]
  return (
    <>
      <section
        className={`about-area ${styles.tempStyle}`}
        style={{ paddingBottom: 0 }}
      >
        {isMobile && <div className="w-full h-[15px] bg-white"></div>}
        <AlertBanner isMobile={isMobile} handleNoticeClick={handleNoticeClick} />
        <Layout
          style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff',
          }}
        >
          <Sider
            collapsed={collapsed}
            width={'20.0vw'}
            style={{
              position: collapsed ? 'absolute' : '',
              zIndex: '1000',
              display: isMobile ? 'none' : '',
            }}
          >
            <div
              style={{
                display: isMobile ? 'none' : '',
                zIndex: '1500',
                borderLeft: '1px #ededed',
                borderTopRightRadius: '32px',
                background:
                  'linear-gradient(134.44deg, rgba(61, 184, 245, 0.03) 3.12%, rgba(31, 66, 239, 0.03) 100%)',
                transition:
                  'all 300ms cubic-bezier(0.335, 0.010, 0.030, 1.360)',
                height: collapsed ? '0px' : '100%',
                width: collapsed ? '0px' : '100%',
              }}
            >
              <div
                className={
                  collapsed
                    ? 'animate__animated animate__fadeOut'
                    : ' pt-10  lg:pt-20 grid grid-flow-row grid-cols-1  md:grid-cols-2 gap-y-6 gap-x-3 p-[5%] lg:p-[15%] text-[0.8rem] lg:text-[0.9rem] font-[450] z-[1510]'
                }
              >
                {navigation?.map(data=>(
                  <NavigationLink data={data} />
                ))}
              </div>{' '}
              <div className="flex justify-center mt-8">
                <button
                  className="bg-gradient w-full lg:w-1/2 rounded-xl py-2 px-4 mx-4 text-white"
                  onClick={() => setPricingPlanModalOpen(true)}
                >
                  View Plans
                </button>
                <PricingTableModal
                  open={pricingPlanModalOpen}
                  onClose={() => setPricingPlanModalOpen(false)}
                  maxWidth="lg"
                  fullWidth={true}
                />
              </div>
            </div>
          </Sider>

          <Layout
            className="site-layout"
            style={{ backgroundColor: '#ffffff' }}
          >
            {props.children &&
              React.cloneElement(props.children, {
                walletData: walletData && Object.values(walletData),

                currentWalletData:
                  walletData &&
                  currentWalletId &&
                  walletData[`${currentWalletId}`]
                    ? walletData[`${currentWalletId}`]
                    : null,
              })}
          </Layout>
        </Layout>
        {/* <NewWalletDialog
        dialogState={newWalletDialogState}
        setdialogState={setnewWalletDialogState}
        userDataRedux={userDataRedux}
      /> */}
      </section>
    </>
  )
}

export default DashboardSidebar
