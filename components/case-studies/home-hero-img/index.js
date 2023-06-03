import styles from './index.module.css'
import Image from 'next/image'
import Dots from '../../common/svgs/dots'
import { useMediaQuery } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import BrandCard from '../brand-card/index'

const laptopImg = require('../../../assets/images/home-page/hero/hero-laptop.webp')
const laptopImgLines = require('../../../assets/images/home-page/hero/laptop-lines.svg')
const infrastructureImage = require('../../../assets/images/home-page/CaseStudies.svg')


const HomeHeroImg = ({isWallet}) => {
  const isTablet = useMediaQuery('(max-width: 768px)')

  const renderDots = () => {
    if (isTablet) {
      return (
        <>
          <Dots sides={{ top: '0px', right: '30px', width: '120' }} />
          <Dots sides={{ top: '120px', right: '120px', width: '120' }} />
        </>
      )
    } else {
      return (
        <>
          <Dots sides={{ top: '90px', right: '120px' }} />
          {/* <Dots sides={{ top: '460px', right: '320px' }} /> */}
        </>
      )
    }
  }

  return (
    <div className={styles.base}>
      {renderDots()}
      <div className={`${styles.img} ${!isWallet ? 'sm:translate-y-40 sm:scale-75 lg:translate-y-0 lg:scale-100' : ''}`}>

          <AnimatePresence>
            {
              isWallet && <motion.div
                initial={{ opacity: 0, position: "absolute" }}
                animate={{ opacity: 1, position: "relative" }}
                exit={{ opacity: 0, position: "absolute" }}
              >
                <Image src={laptopImg} alt="Relysia Hero Image" />
              </motion.div>
            }
          </AnimatePresence>

        <div className='top-0 w-full h-full'>
          <AnimatePresence>
            {
              !isWallet && <motion.div
                initial={{ opacity: 0, position: "absolute" }}
                animate={{ opacity: 1, position: "relative" }}
                exit={{ opacity: 0, position: "absolute" }}>
                <Image src={infrastructureImage} alt="Relysia Hero Image" height='750px' width='750px' />
              </motion.div>
            }
          </AnimatePresence>
        </div>
        
      </div>
      {
        isWallet &&
        <div className={styles.lines}>
          <Image className={styles.lines} src={laptopImgLines} alt="" />
        </div>
      }

    </div>
  )
}

export default HomeHeroImg
