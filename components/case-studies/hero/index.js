import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from '../../../components/common/button'
import Container from '../../../components/common/container'
import styles from './index.module.css'
import cn from 'classnames'
import Dots from '../../../components/common/svgs/dots'
import Title from '../../../components/common/title'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import router from 'next/router'
import { useMediaQuery } from '@material-ui/core'
import { Switch } from '@headlessui/react'
import BrandCard from '../brand-card/index'
import HeroSVG from './svg/hero'
import heroBgMap from '../../../assets/images/heroBgMap.png'

function Hero({ goToPlatform }) {
  const [isWallet] = useState(false)
  const isTablet = useMediaQuery('(max-width: 768px)')

  const { walletData } = useSelector(walletSelector)
  function routerPush(e) {
    e.preventDefault()
    if (e.currentTarget.value) {
      return router.push(e.currentTarget.value)
    }
  }

  const backgroundImage = {
    backgroundImage: `url(${heroBgMap.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  }

  return (
    <>
      <section className={styles.hero} style={backgroundImage}>
        <Container>
          {isTablet ? (
            <Dots sides={{ bottom: '-150px', left: '20px' }} />
          ) : (
            <Dots sides={{ bottom: '14px', left: '64px' }} />
          )}
          <div className={styles.wrapper}>
            <div className={cn(styles.heroLeft)}>
              <Switch className="relative flex items-center bg-gray-600 rounded-full mb-2 p-1">
                <div className={`w-32 p-1 rounded-full gradient-background`}>
                  Case Studies
                </div>
              </Switch>
              <Title heading="h1">The Core of Blockchain Applications</Title>
              <p className={styles.p}>
                Our backend infrastructure powers over 20 Bitcoin SV
                applications.
              </p>
              <div className={styles.actions}>
                {walletData && Object.values(walletData) !== 0 && (
                  <>
                    {isWallet ? (
                      <Button
                        value="/app/wallet"
                        onClick={routerPush}
                        appearance="primary"
                      >
                        Bitcoin Wallet
                      </Button>
                    ) : (
                      <Button
                        value="/onboarding"
                        onClick={routerPush}
                        appearance="primary"
                      >
                        Create Project
                      </Button>
                    )}
                  </>
                )}
              </div>
              <div>
                <Button
                  arrow="down-bordered"
                  appearance="noBox"
                  className="underline"
                  onClick={goToPlatform}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className={styles.imgWrapper}>
              <img src="/case-study.png" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

Hero.propTypes = {
  goToPlatform: PropTypes.func.isRequired,
}

export default Hero
