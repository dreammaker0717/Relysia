import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Footer from '../footer'
import Header from '../header'
import cn from 'classnames'
const mainGradient = '/assets/images/main-gradient.svg'
const SharedLayout = ({ children, router }) => {
  const { route } = router
  const page = useRef()

  const noFooter = ['/auth/login', '/auth/register']

  useEffect(() => {
    if (route === '/api-docs') {
      document.body.style.overflowX = 'initial'
      page.current.style.overflow = 'unset'
    } else {
      document.body.style.overflowX = 'hidden'
      page.current.style.overflow = 'hidden'
    }

    if (route === '/blog') {
      page.current.style.backgroundImage = `url(${mainGradient})`
      page.current.style.backgroundPosition = 'top right'
      page.current.style.backgroundRepeat = 'no-repeat'
    } else {
      page.current.style.backgroundImage = 'none'
      page.current.style.ba
    }
  }, [route])

  const renderFooter = () => {
    if (!noFooter.includes(route)) {
      return <Footer router={router} />
    }
  }

  return (
    <div
      ref={page}
      className={cn(
        'page',
        'animate__animated  animate__fadeIn',
        'min-h-screen flex flex-col',
      )}
    >
      <Header router={router} />
      {children}

      {renderFooter()}
    </div>
  )
}

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SharedLayout
