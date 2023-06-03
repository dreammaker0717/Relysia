import { useMediaQuery } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import DesktopFooter from './DesktopFooter'
import dynamic from 'next/dynamic'
const MobileFooter = dynamic(() => import('./MobileFooter'))

const Footer = ({ router }) => {
  const { pathname } = router

  const isMobile = useMediaQuery('(max-width:768px)')
  const { userData } = useSelector(authSelector)

  if (pathname.includes('app/') && isMobile && userData) {
    return (
      <>
        <MobileFooter router={router} pathname={pathname} />
        <DesktopFooter router={router} pathname={pathname} />
      </>
    )
  }
  return <DesktopFooter router={router} pathname={pathname} />
}

export default Footer
