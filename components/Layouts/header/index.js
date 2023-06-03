import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'
import styles from './index.module.css'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@material-ui/core'
import cn from 'classnames'
import { useEffect, useState } from 'react'

import {
  destroyWalletAction,
  updateUserDataAction,
} from '@/redux/slices/wallet'
import { logout } from '@/redux/slices/auth'
import {
  firebaseLogout
} from '@/firebase/auth'

const Button = dynamic(() => import('../../common/button'))
const UserDropdown = dynamic(() =>
  import('../../common/dropdowns/user-dropdown'),
)
const RenderMobileMenu = dynamic(() => import('./mobileComp'))
const DesktopHeader = dynamic(() => import('./DesktopComp'))
const APIComp = dynamic(() => import('./APIComp'))
const Header = ({ router }) => {
  const isMobile = useMediaQuery('(max-width:768px)')
  const dispatch = useDispatch()
  const { pathname } = router
  const [userPanel, serUserPanel] = useState(false)
  const { userData } = useSelector(authSelector)
  const { walletData } = useSelector(walletSelector)

  const signOutFunction = (e) => {
    e?.preventDefault()
    firebaseLogout()
    dispatch(logout()).unwrap()
    dispatch(destroyWalletAction(null))
    localStorage.setItem('auth__token', '')
  }

  const renderSignInOut = (mobile) => {
    let token =
      typeof window !== 'undefined' ? localStorage.getItem('auth__token') : null
    if ((userData && !mobile) || token) {
      return (
        <UserDropdown
          signOutFunction={signOutFunction}
          router={router}
          user={userData}
        />
      )
    } else {
      return (
        <div>
          <Link href="/auth/login">
            <a
              className={cn(
                'py-2 px-2 font-semibold hover:text-white',
                mobile && 'text-xs leading-3 py-2 px-2',
              )}
            >
              Sign In
            </a>
          </Link>
          <Button
            href="/auth/register"
            appearance="primary"
            className={`${mobile && 'text-xs leading-3 py-2 px-2'}`}
            small
          >
            Sign Up
          </Button>
        </div>
      )
    }
  }

  const checkWalletDataForLink =
    walletData && Object.values(walletData).length > 0
      ? `/app/wallet`
      : '/app/new-wallet'

  const checkWalletDataForActiveLink =
    walletData && Object.values(walletData).length > 0 ? '/app' : '/app'

  return pathname === '/api-docs' ? (
    <>
      {!isMobile ? (
        <APIComp
          userData={userData}
          Link={Link}
          styles={styles}
          pathname={pathname}
          renderSignInOut={renderSignInOut}
          checkWalletDataForLink={checkWalletDataForLink}
        />
      ) : (
        <RenderMobileMenu
          userData={userData}
          Link={Link}
          userPanel={userPanel}
          serUserPanel={serUserPanel}
          styles={styles}
          pathname={pathname}
          checkWalletDataForLink={checkWalletDataForLink}
          checkWalletDataForActiveLink={checkWalletDataForActiveLink}
          signOutFunction={signOutFunction}
        />
      )}
    </>
  ) : (
    <>
      {!isMobile ? (
        <DesktopHeader
          userData={userData}
          Link={Link}
          styles={styles}
          pathname={pathname}
          renderSignInOut={renderSignInOut}
          checkWalletDataForLink={checkWalletDataForLink}
        />
      ) : (
        <RenderMobileMenu
          userData={userData}
          Link={Link}
          userPanel={userPanel}
          serUserPanel={serUserPanel}
          styles={styles}
          pathname={pathname}
          checkWalletDataForLink={checkWalletDataForLink}
          checkWalletDataForActiveLink={checkWalletDataForActiveLink}
          signOutFunction={signOutFunction}
        />
      )}
    </>
  )
}

export default Header
