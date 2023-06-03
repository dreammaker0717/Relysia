import Container from '../../common/container'
import Title from '../../common/title'
import styles from './index.module.css'
import Button from '../../common/button'
import Dots from '../../common/svgs/dots'
import Image from 'next/image'
import Centi from '/assets/images/case-studies/centi.svg'
import Centi1 from 'assets/images/case-studies/centi1.png'
import Centi2 from 'assets/images/case-studies/centi2.png'
import Centi3 from 'assets/images/case-studies/centi3.png'
import StasToken from './svgs/stastoken'
import Transactions from './svgs/transactions'
import AuthenticationIcon from './svgs/authenticationicon'
import MedianResponse from './svgs/medianresponse'
import TotalRequest from './svgs/totalrequest'
import RateLimited from './svgs/ratelimited'
import Avatar from 'assets/images/case-studies/bernhardCenti.png'
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

  const slideImages = [Centi1.src, Centi2.src, Centi3.src]
  return (
    <section className={styles.base} style={{ width: '100vw' }} id="centi">
      <Container>
        {/* <DotsModified sides={{ bottom: '-140px', left: '40px' }} /> */}
        <Dots sides={{ bottom: '80px', right: '-160px' }} />
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Image className={styles.lines} src={Centi} alt="" />
            <Title heading="h3" classNames={styles.h2}>
              Enjoy Micropayments at Scale.
            </Title>
            <p className={styles.p}>
              With CENTI you can easily wire Micropayments in real-time at
              almost no cost. Tip your favorite artist as a consumer or as a
              business integrate Micropayments to enable paid content.
              <br />
              <br />
              You can use Centi for digital cash payments, API integrations and
              much more!
            </p>
            <Button
              className={styles.button}
              appearance="fat"
              href="https://www.centi.ch"
              gradientBg
            >
              Go to Website
            </Button>

            <hr className={styles.hr} />
            <div>
              <p>
                “The Relysia Infrastructure enabled us to build a professional
                payments application in a matter of months.”
              </p>
              <div className={styles.avatarBody}>
                <Image src={Avatar} alt="Avatar" style={{ margin: '0px' }} />
                <p className={styles.avatarName + ' mt-0'}>
                  Bernhard Muller, CEO CENTI
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
              <div className={`flex p-4 ${styles.media}`}>
                <StasToken className="pe-5" />
                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>STAS Tokens</h5>
                </div>
              </div>
              <div className={`flex p-4 ${styles.media}`}>
                <Transactions className="pe-5" />
                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Transactions</h5>
                </div>
              </div>
              <div className={`flex p-4 ${styles.media}`}>
                <AuthenticationIcon className="pe-5" />

                <div className={styles.mediaBody}>
                  <h5 className={styles.mediaTxt}>Authentication</h5>
                </div>
              </div>
              <div className={`flex p-4 ${styles.media}`}>
                <MedianResponse className="pe-5" />
                <div className={styles.mediaBody}>
                  {/* <h5 className={styles.mediaTxt}>STAS Tokens</h5> */}
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>MEDIAN RESPONSE</h5>
                    <h5 className={styles.mediaFig}>25ms</h5>
                  </div>
                </div>
              </div>
              <div className={`flex p-4 ${styles.media}`}>
                <TotalRequest className="pe-5" />
                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>ENDPOINTS USED</h5>
                    <h5 className={styles.mediaFig}>14</h5>
                  </div>
                </div>
              </div>
              <div className={`flex p-4 ${styles.media}`}>
                <RateLimited className="pe-5" />
                <div className={styles.mediaBody}>
                  <div className={styles.mediaFigTxt}>
                    <h5 className={styles.mediaFigHead}>TRANSACTIONS (24HR)</h5>
                    <h5 className={styles.mediaFig}>1974</h5>
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
