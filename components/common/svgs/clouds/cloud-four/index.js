import styles from './index.module.css'
import PropTypes from 'prop-types'

const CloudFourSVG = ({ opacity = '0.1', top = '0', left = '0' }) => {
  return (
    <img
      style={{
        top,
        left,
      }}
      className={styles.svg}
      src="/home/images/cloud-four.svg"
    />
  )
}

CloudFourSVG.propTypes = {
  opacity: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
}

export default CloudFourSVG
