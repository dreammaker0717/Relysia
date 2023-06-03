import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import ArrowRight from '../../svgs/arrow-right'
import cn from 'classnames'
import { formatBlogDate } from '../../../../utils'
import ReactHtmlParser from 'html-react-parser'

const CardArticleSummary = ({
  title,
  img,
  p,
  date,
  href,
  horizontal,
  classNames,
}) => {
  if (horizontal) {
    return (
      <div className={cn(styles.base, styles.horizontal, classNames)}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={img} alt={title} layout="fill" />
        </div>
        <div className={cn(styles.info)}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.p}>{ReactHtmlParser(p)}</div>
          <div className={styles.bottom}>
            <span className={styles.date}>{formatBlogDate(date)}</span>
            <Link href={href} as={href}>
              <a className={styles.read}>
                <span>Read More</span>
                <ArrowRight />
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(styles.base, classNames)}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={img}
          alt={title}
          layout="fill"
          style={{ width: '100%', objectFit: 'cover', aspectRatio: '1' }}
        />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.p}>{ReactHtmlParser(p)}</div>
        <div className={styles.bottom}>
          <span className={styles.date}>{formatBlogDate(date)}</span>
          <Link href={href}>
            <a className={styles.read}>
              <span>Read More</span>
              <ArrowRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

CardArticleSummary.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  blurImg: PropTypes.string,
  date: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  horizontal: PropTypes.bool,
  classNames: PropTypes.string,
}

CardArticleSummary.defaultProps = {
  href: '/',
}

export default CardArticleSummary
