import PropTypes from 'prop-types'
import styles from './index.module.css'
import Image from 'next/image'

const CardWithIcon = ({ title, p, icon }) => {
  return (
    <div className={styles.base}>
      <div className={styles.icon}>
        <Image width={100} height={100} src={icon} alt={title} />
      </div>
      <div>
        <h1 className={styles.title}> {title} </h1>
        <p className={styles.p}> {p} </p>
      </div>
    </div>
  )
}

CardWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
}

export default CardWithIcon
