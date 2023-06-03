import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Button from '../../common/button'
import CardSeeMore from '../../common/cards/card-see-more'
import Dots from '../../common/svgs/dots'
import { Lottie } from '@/utils/lottie'
import APICode from '../../../assets/LottieFiles/APICODE.json'
import Image from 'next/image'
const circleShapex2 = require('../../../assets/images/home-page/api-section/circle-shape.svg')

const ApiSection = () => {
  return (
    <section className={styles.base} style={{ width: '100vw' }}>
      <Container>
        <Dots sides={{ bottom: '-140px', left: '40px' }} />
        <Dots sides={{ bottom: '80px', right: '-160px' }} />
        <Title optimised heading="h5">Designed for developers</Title>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Title heading="h2">
              Powerful and <br /> easy-to-use <br /> APIs
            </Title>
            <p className={styles.p}>
              We learned from developing 13 platforms over the year a lot about
              efficient blockchain-based systems. The API is our abstraction of
              all relevant BSV functionality that can be implemented in any
              system.
            </p>
            <Button appearance="fat" href="/docs" arrow="right" gradientBg>
              Read the docs
            </Button>

            <div className="flex gap-3 md:gap-20">
              <CardSeeMore
                href="https://api.relysia.com/docs"
                title="Tools for every stack"
                p="We offer client and server libraries in JavaScript and soon multiple other languages."
                btnText="See our API"
              />

              <CardSeeMore
                href="/docs"
                title="Prebuilt integrations"
                p="We are about to launch a variety of pre-build integrations to simplify blockchain development."
                btnText="Dev Docs"
              />
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.img}>
              <Lottie animationData={APICode} />
            </span>
            <span className={styles.circle}>
              <Image
                layout="responsive"
                src={circleShapex2}
                alt="Api Code Circle"
              />
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ApiSection
