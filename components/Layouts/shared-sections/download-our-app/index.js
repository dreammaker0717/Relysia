import styles from './index.module.css'
import cn from 'classnames'
import PropTypes from 'prop-types'
import Title from '../../../common/title'
import Container from '../../../common/container'

const appMockup = '/assets/images/home-page/download-our-app/app-mockup.webp'
const mapImg = '/assets/images/home-page/download-our-app/map.png'
// const playStoreImg = '/assets/images/home-page/download-our-app/play-store.svg'
// const appStoreImg = '/assets/images/home-page/download-our-app/app-store.svg'

const DownloadOurApp = ({ classNames }) => {
  return (
    <section
      className={cn(styles.base, classNames)}
      style={{ backgroundImage: `url(${mapImg})`, width: '100vw' }}
    >
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <img
              className={styles.appImg}
              src={appMockup}
              alt="Download Our App"
            />
          </div>
          <div className={styles.right}>
            <div className={styles.content}>
              <Title heading="h1" border classNames="w-72">
                Our Service Plans
              </Title>
              <p className={styles.p}>
                With Relysia we aim to provide the best possible blockchain service for our clients 
                and development partners at competitive rates. 
              </p>
              <p className={styles.p}>
                We offer all blockchain base service free of cost, and extended services such as dedicated servers
                and exchange endpoints for affordable monthly rates.
              </p>
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

DownloadOurApp.propTypes = {
  classNames: PropTypes.string,
}

export default DownloadOurApp
