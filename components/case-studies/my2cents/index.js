import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Button from '../../common/button'
import Image from 'next/image'
import My2Cents from '/assets/images/case-studies/my2cents.svg'
import My2View1 from 'assets/images/case-studies/My2Cents1.png'
import My2View2 from 'assets/images/case-studies/My2Cents2.png'
import My2View3 from 'assets/images/case-studies/My2Cents3.png'
import StasToken from '../musicart/svgs/stastoken'
import Transactions from '../musicart/svgs/transactions'
import AuthenticationIcon from '../musicart/svgs/authenticationicon'
import MedianResponse from '../musicart/svgs/medianresponse'
import TotalRequest from '../musicart/svgs/totalrequest'
import RateLimited from '../musicart/svgs/ratelimited'
import Avatar from 'assets/images/case-studies/maxi2cents.png'
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

  const slideImages = [My2View2.src, My2View1.src, My2View3.src]
  return (
    <section className={styles.base} id="my2Cents">
      <Container>
        {/* <BackgroundSvg sides={{ bottom: '80px', right: '-160px' }} /> */}
        <div className={styles.wrapper}>
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
          <div className={styles.left}>
            <Image className={styles.lines} src={My2Cents} alt="" />
            <Title heading="h2" classNames={styles.h2}>
              BLOCKCHAIN BASED WEB 3.0 SOCIAL PLATFORM
            </Title>
            <p className={styles.p}>
              My2Cents is an exciting new social media platform on Bitcoin.
              Users get paid for their content whenever they get a plus or a
              repost.
              <br />
              <br />
              With pages like: myVid, myBook, myIdea, myJob, myPodcast, myReuse,
              myCM and mySlowFood - it is a universal platform for all of your
              social needs.
            </p>
            <Button
              className={styles.button}
              appearance="fat"
              href="https://www.my2cents.io"
              gradientBg
            >
              Go to app
            </Button>

            <hr className={styles.hr} />
            <div>
              <p>
                “Without the Relysia API, we would have had to build our own
                BitCoin backend from scratch.”
              </p>
              <div className={styles.avatarBody}>
                <Image src={Avatar} alt="Avatar" style={{ margin: '0px' }} />
                <p className={styles.avatarName + ' mt-0'}>
                  Dr. Maximillian Korkmaz, CEO My2Cents
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <BackgroundSvg sides={{ }} /> */}
        <div className={styles.musicArtCard + ' card'}>
          <div className="card-body">
            <p className="text-center">RELYSIA INFRASTRUCTURE USED</p>
            <div className={styles.cardContainer}>
              <div className={`flex  ${styles.media}`}>
                <StasToken className="pe-5" />

                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>STAS Tokens</h5>
                </div>
              </div>
              <div className={`flex  ${styles.media}`}>
                <Transactions className="pe-5" />

                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Transactions</h5>
                </div>
              </div>
              <div className={`flex  ${styles.media}`}>
                <AuthenticationIcon className="pe-5" />

                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Authentication</h5>
                </div>
              </div>
              <div className={`flex  ${styles.media}`}>
                <MedianResponse className="pe-5" />

                <div className={styles.mediaBody}>
                  {/* <h5 className={styles.mediaTxt}>STAS Tokens</h5> */}
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>MEDIAN RESPONSE</h5>
                    <h5 className={styles.mediaFig}>25ms</h5>
                  </div>
                </div>
              </div>
              <div className={`flex  ${styles.media}`}>
                <TotalRequest className="pe-5" />

                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>ENDPOINTS USED</h5>
                    <h5 className={styles.mediaFig}>9</h5>
                  </div>
                </div>
              </div>
              <div className={`flex  ${styles.media}`}>
                <RateLimited className="pe-5" />

                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>TRANSACTIONS (24HR)</h5>
                    <h5 className={styles.mediaFig}>537,086</h5>
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
