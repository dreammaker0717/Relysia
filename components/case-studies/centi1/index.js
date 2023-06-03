import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Button from '../../common/button'
import CardSeeMore from '../../common/cards/card-see-more'
import Dots from '../../common/svgs/dots'
import Image from 'next/image'
import Centi from '/assets/images/case-studies/centi.svg'
import CentiView from 'assets/images/case-studies/My2CentsView.png'

const ApiSection = () => {
  return (
    <section className={styles.base} style={{ width: '100vw' }}>
      <Container>
        <Dots sides={{ bottom: '-140px', left: '40px' }} />
        <Dots sides={{ bottom: '80px', right: '-160px' }} />
        <div className={styles.wrapper}>
          <div className={styles.right}>
            <Image layout="responsive" src={CentiView} alt="Api Code Circle" />
          </div>
          <div className={styles.left}>
            <Image className={styles.lines} src={Centi} alt="" />
            <Title heading="h2">ONLINE PAYMENT SYSTEMS FOR BUSINESS</Title>
            <p className={styles.p}>
              MusicArt is a unique new NFT platform with its sole focus on
              celebrating and promoting music-based art and imagery. This makes
              MusicArt the perfect environment for musicians to trade their
              visual art, as opposed to seeing their work lost in a sea of NFTs
              in unrelated genres on other platforms.
            </p>
            <Button
              appearance="fat"
              href="https://www.my2cents.io"
              arrow="right"
              gradientBg
            >
              Go to app
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
        </div>
      </Container>
    </section>
  )
}

export default ApiSection
