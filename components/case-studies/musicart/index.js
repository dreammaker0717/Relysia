import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Button from '../../common/button'

import Image from 'next/image'
import MusicArt from '/assets/images/case-studies/musicart.svg'
import MusicView1 from 'assets/images/case-studies/MusicArtBanner1.png'
import MusicView2 from 'assets/images/case-studies/MusicArtBanner2.png'
import MusicView3 from 'assets/images/case-studies/MusicArtBanner3.png'
import StasToken from './svgs/stastoken'
import Transactions from './svgs/transactions'
import AuthenticationIcon from './svgs/authenticationicon'
import MedianResponse from './svgs/medianresponse'
import TotalRequest from './svgs/totalrequest'
import RateLimited from './svgs/ratelimited'
import Avatar from 'assets/images/case-studies/musicartceo.png'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'

const ApiSection = () => {
  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    arrows: true,
    infinite: true,
    easing: 'ease',
    // indicators: (i) => <div className="indicator"> O </div>
  }

  const slideImages = [MusicView1.src, MusicView2.src, MusicView3.src]
  return (
    <section className={styles.base} style={{ width: '100vw' }} id="musicart">
      <Container>
        <div className="slide-container"></div>
        {/* <DotsModified sides={{ bottom: '-140px', left: '40px' }} /> */}
        {/* <Dots sides={{ bottom: '80px', right: '-160px' }} /> */}
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Image className={styles.lines} src={MusicArt} alt="" />
            <Title heading="h2" classNames={styles.h2}>
              OWN THE ART OF MUSIC
            </Title>
            <p className={styles.p}>
              MusicArt is a unique new NFT platform with its sole focus on
              celebrating and promoting music-based art and imagery. This makes
              MusicArt the perfect environment for musicians to trade their
              visual art, as opposed to seeing their work lost in a sea of NFTs
              in unrelated genres on other platforms.
            </p>
            <Button
              className={styles.button}
              appearance="fat"
              href="https://www.musicart.com"
              gradientBg
            >
              Go to app
            </Button>

            <hr className={styles.hr} />
            <div>
              <p>
                “We built our platform on the solid foundation of Relysia API.
                They are the best choice for Bitcoin development.”
              </p>
              <div className={styles.avatarBody}>
                <Image src={Avatar} alt="Avatar" style={{ margin: '0px' }} />
                <p className={styles.avatarName + ' mt-0'}>
                  Peter Ruppert, CEO Music Art
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.right} ImageSlider`}>
            <Slide
              {...properties}
              nextArrow={
                <button
                  style={{
                    background: 'none',
                    border: '0px',
                    width: '30px',
                  }}
                >
                  <svg
                    fill="#fff"
                    height="20"
                    style={{ float: 'right' }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </button>
              }
              prevArrow={
                <button
                  style={{
                    background: 'none',
                    border: '0px',
                    width: '30px',
                  }}
                >
                  <svg
                    fill="#fff"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </button>
              }
            >
              {slideImages.map((each, index) => (
                <div key={index} className="each-slide">
                  <img className={styles.lazy} src={each} alt="sample" />
                </div>
              ))}
            </Slide>
            {/* <Image layout="responsive" src={MusicView} alt="Api Code Circle" /> */}
          </div>
        </div>
        <div className={styles.musicArtCard + ' card'}>
          <div className="card-body">
            <p className="text-center">RELYSIA INFRASTRUCTURE USED</p>
            <div className={styles.cardContainer}>
              <div className={`flex ${styles.media}`}>
                <StasToken className="pe-5" />
                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>STAS Tokens</h5>
                </div>
              </div>
              <div className={`flex ${styles.media}`}>
                <Transactions className="pe-5" />
                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Transactions</h5>
                </div>
              </div>
              <div className={`flex ${styles.media}`}>
                <AuthenticationIcon className="pe-5" />

                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Authentication</h5>
                </div>
              </div>
              <div className={`flex ${styles.media}`}>
                <MedianResponse className="pe-5" />
                <div className={styles.mediaBody}>
                  {/* <h5 className={styles.mediaTxt}>STAS Tokens</h5> */}
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>MEDIAN RESPONSE</h5>
                    <h5 className={styles.mediaFig}>25ms</h5>
                  </div>
                </div>
              </div>
              <div className={`flex ${styles.media}`}>
                <TotalRequest className="pe-5" />
                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>ENDPOINTS USED</h5>
                    <h5 className={styles.mediaFig}>12</h5>
                  </div>
                </div>
              </div>
              <div className={`flex ${styles.media}`}>
                <RateLimited className="pe-5" />
                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>TRANSACTIONS (24HR)</h5>
                    <h5 className={styles.mediaFig}>318</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ApiSection
