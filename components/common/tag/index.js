import PropTypes from 'prop-types'
import styles from './index.module.css'

const Tag = ({ name }) => {
  return <span className={styles.tag}>{name}</span>
}

Tag.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Tag
