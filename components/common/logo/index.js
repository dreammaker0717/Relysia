import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Image from 'next/image'
const logo = require('../../../assets/images/RelysiaLogo_1.svg')

const Logo = ({ width = '124px' }) => {
  const { pathname, router } = useRouter()

  return (
    <div className={styles.base}>
      <div className={styles.imgWrapper}>
        <Image src={logo} alt="Relysia Logo" />
      </div>
      <span
        className={styles.text}
        style={{
          color: !(pathname.includes('app/') || pathname.includes('dashboard/') ) ? 'white' : 'black',
        }}
      >
        Relysia
      </span>
    </div>
  )
}

Logo.propTypes = {
  width: PropTypes.string,
}

export default Logo
