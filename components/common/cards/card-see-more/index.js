import Button from '../../button'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const CardSeeMore = ({href, title, p, btnText }) => {
  return (
    <div className={styles.base}>
      <div>
        <h1 className={styles.title}> {title} </h1>
        <p className={styles.p}> {p} </p>
      </div>
      <div>
        <Button
          appearance="noBox"
          href={href}
          arrow="right"
          fill="red"
          className="font-bold items-end"
        >
          {btnText}
        </Button>
      </div>
    </div>
  )
}

CardSeeMore.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
}

export default CardSeeMore
