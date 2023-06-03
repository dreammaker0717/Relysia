import Container from '../common/container'
import styles from './index.module.css'
import Image from 'next/image'

import Title from '../common/title'
import Button from '../common/button'
import cn from 'classnames'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'
import router from 'next/router'
import { useMediaQuery } from '@material-ui/core'
const demoAviator = '/assets/images/demo/demo-aviator.svg'
const demoBlocks = '/assets/images/demo/demo-blocks.svg'

const DemoHome = () => {
  const isTablet = useMediaQuery('(max-width: 768px)')
  const titleSizes = isTablet
    ? 'text-h1 leading-h1 font-bold'
    : 'text-[5.625rem] leading-[5rem]'

  const { userData, checked } = useSelector(authSelector)
  const { walletData } = useSelector(walletSelector)
  const handleClick = (e) => {
    e.preventDefault()
    // console.log(e.currentTarget.value)
    if (e.currentTarget.value) {
      if (userData && checked) {
        if (!walletData || (walletData && !Object.values(walletData).length)) {
          return router.push('/app/new-wallet')
        } else {
          window.location.href = `/game/${e.currentTarget.value}`
        }
      } else {
        router.push(`/auth/login?redirectto=/game/${e.currentTarget.value}`)
      }
    }
  }
  return (
    <Container>
      <section className={cn(styles.section, styles.sectionTop)}>
        <div className={styles.sectionImageWr}>
          <Image
            className={styles.sectionImage}
            src={demoAviator}
            alt="Relysia Demo Aviator"
            layout="responsive"
            width={650}
            height={675}
            // priority={true}
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <Title heading="h1" classNames={`w-24 ${titleSizes}`}>
              The Aviator
            </Title>
            <p className={styles.p}>
              Test our infrastructure speed and write transactions to the
              blockchain. The more points you earn, the more transactions you make. 
            </p>
            <div>
              <Button
                className="mr-6"
                appearance="primary"
                onClick={handleClick}
                value="aviator"
              >
                Play Demo
              </Button>
              <Button
                appearance="secondary"
                href="https://github.com/vaionex/aviator-blockchain"
              >
                Go to Source
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={cn(styles.section, styles.sectionBottom)}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <Title heading="h2" classNames={`w-24 ${titleSizes}`}>
              Tower Blocks
            </Title>
            <p className={styles.p}>
              With Tower Blocks, you get the chance to eternalize your skills on
              the blockchain. Each block added creates an OP_Return entry
              onchain.
            </p>
            <div>
              <Button
                onClick={handleClick}
                value="tower-blocks"
                className="mr-6"
                appearance="primary"
              >
                Play Demo
              </Button>
              {/* <Button appearance="secondary" href="#">
                Go to Source
              </Button> */}
            </div>
          </div>
        </div>
        <div className={styles.sectionImageWr}>
          <Image
            className={styles.sectionImage}
            src={demoBlocks}
            alt="Relysia Demo Blocks"
            layout="responsive"
            width={720}
            height={725}
            priority={true}
          />
        </div>
      </section>
    </Container>
  )
}

export default DemoHome
