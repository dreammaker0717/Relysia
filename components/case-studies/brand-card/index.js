
import dynamic from 'next/dynamic'
import styles from './index.module.css'
const My2Cents = dynamic(() => import('./svgs/my2cents'))
const Centi = dynamic(() => import('./svgs/centi'))
const GP = dynamic(() => import('./svgs/g&p'))
const Gravity = dynamic(() => import('./svgs/gravity'))
const Musicart = dynamic(() => import('./svgs/musicart'))
const Soundoshi = dynamic(() => import('./svgs/soundoshi'))
const Stas = dynamic(() => import('./svgs/stas'))

function BrandCard() {
  return (
    <section>
      <div className={styles.brandCard + ' card max-w-7xl mx-auto '}>
        <div className="card-body max-w-7xl mx-auto">
          <p className={styles.brandCardP}>
            Powering the blockchain interactions of:
          </p>
          <ul className={styles.brandCardDFlex}>
            <li className={styles.brandCardBrand}>
              <a href='#my2Cents'>
                <My2Cents />
              </a>
            </li>
            <li className={styles.brandCardBrand}>
              <Gravity />
            </li>
            <li className={styles.brandCardBrand}>
              <a href='#musicart'>
                <Musicart />
              </a>

            </li>
            <li className={styles.brandCardBrand}>
              <a href='#centi'>
                <Centi />
              </a>

            </li>
            <li className={styles.brandCardBrand}>
              <Stas />
            </li>
            <li className={styles.brandCardBrand}>
              <GP />
            </li>
            <li className={styles.brandCardBrandLast}>
              <Soundoshi />
            </li>
          </ul>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div className={styles.brandCard + ' ' + styles.secondLayerCard + ' card max-w-7xl mx-auto'}>
          <div className="card-body">
          </div>
        </div>
      </div>
      <div style={{ padding: '40px' }}>
        <div className={styles.brandCard + ' ' + styles.thirdLayerCard + ' card max-w-7xl mx-auto'} >
          <div className="card-body">
          </div>
        </div>
      </div>
    </section>
  )
}

BrandCard.propTypes = {
  // goToPlatform: PropTypes.func.isRequired
}

export default BrandCard
