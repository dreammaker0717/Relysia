import PropTypes from 'prop-types'
import styles from './index.module.css'
import cn from 'classnames'

const Caption = ({ text, classNames }) => {
  return <span className={cn(styles.base, classNames)}>{text}</span>
}

Caption.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string,
}

export default Caption
