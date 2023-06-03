import styles from './index.module.css'
import cn from 'classnames'
import PropTypes from 'prop-types'
import Title from '../../../common/title'
import Container from '../../../common/container'
import { useState } from 'react'
import PricingTableModal from '../../../pricing/PricingTableModal'
import Image from 'next/image'

const appMockup = '/assets/images/home-page/value-for-service/image.webp'
// const playStoreImg = '/assets/images/home-page/download-our-app/play-store.svg'
// const appStoreImg = '/assets/images/home-page/download-our-app/app-store.svg'

const ValueForService = ({ classNames }) => {
  const [pricingPlans, setPricingPlans] = useState(false)

  return (
    <section
      className={cn(styles.base, classNames)}
      style={{ width: '100vw' }}
    >
      <Container>
        <div className="flex flex-col max-w-7xl lg:flex-row pb-10">
          <div className="flex flex-1 relative left-10 transform lg:scale-150 z-[-1]">
            <Image
              alt="Download Our App"
              src={appMockup}
              layout="fill"
            />
            {/* <img width="1100px" height="100%" src={appMockup} alt="Download Our App" /> */}
          </div>
          <div className={'flex flex-1'}>
            <div className={'max-w-md lg:ml-36 mt-12'}>
              <Title optimised heading="h5" classNames={'-mb-10'}>pricing plans</Title>
              <Title heading="h1" classNames=" ">
                <br />Free <br /> Unlimited <br /> Business
              </Title>




              <p className={styles.p}>
                We offer a variety of blockchain-based services free of cost and
                extended services such as dedicated and exchange endpoints for
                affordable monthly rates.
              </p>
              <div className="flex justify-start mt-8">
                <button
                  className="bg-gradient w-1/2 rounded-xl py-2 px-4 text-white"
                  onClick={() => setPricingPlans(true)}
                >
                  View Plans
                </button>
                <PricingTableModal
                  open={pricingPlans}
                  onClose={() => setPricingPlans(false)}
                  maxWidth="lg"
                  fullWidth={true}
                />
              </div>
              {/* <div>
                <a rel="noopener noreferrer" target="_blank">
                  <img
                    className="mr-6"
                    src={appStoreImg}
                    alt="Download Our App"
                  />
                </a>
                <a rel="noopener noreferrer" target="_blank">
                  <img src={playStoreImg} alt="Download Our App" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

ValueForService.propTypes = {
  classNames: PropTypes.string,
}

export default ValueForService
