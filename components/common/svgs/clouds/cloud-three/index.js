import styles from './index.module.css'
import PropTypes from 'prop-types'

const CloudThreeSVG = ({ opacity = '0.1', top = '0', right = '0' }) => {
  return (
    <img    className={styles.svg}
    style={{
      top,
      right,
    }} src="/images/home/cloud-three.svg" />
    
  )
}

CloudThreeSVG.propTypes = {
  opacity: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
}

export default CloudThreeSVG
