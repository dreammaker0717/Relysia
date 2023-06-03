import Link from 'next/link'
import cn from 'classnames'
import ArrowRight from '../svgs/arrow-right'

import PropTypes from 'prop-types'
import styles from './index.module.css'
import Image from 'next/image'
const ArrowDownBordered = require('../../../assets/images/arrow-down-bordered.svg')

const Button = ({
  children,
  appearance,
  className,
  arrow,
  href,
  fill,
  small,
  gradientBg,
  icon,
  flat,
  ...props
}) => {
  const btnClass = []

  if (appearance === 'primary') {
    btnClass.push(styles.primary)
    btnClass.push(styles.gradientBg)
  }

  if (appearance === 'secondary') {
    btnClass.push(styles.secondary)
  }

  if (appearance === 'fat') {
    btnClass.push(styles.fat)
  }

  if (appearance === 'noBox') {
    btnClass.push(styles.noBox)
  }

  if (appearance === 'outlined') {
    btnClass.push(styles.outlined)
  }

  if (flat) {
    btnClass.push(styles.flat)
  }

  if (small) btnClass.push(styles.small)

  if (gradientBg) btnClass.push(styles.gradientBg)

  if (href) {
    return (
      <Link href={href} {...props}>
        <a
          className={cn(
            styles.base,
            styles.link,
            ...btnClass,
            className,
            fill === 'red' && 'text-secondary hover:text-secondary',
          )}
        >
          {arrow === 'down-bordered' && (
           <div className={'mr-2'}> <Image  src={ArrowDownBordered} alt="" /></div>
          )}

          {appearance === 'primary' || gradientBg ? (
            <span>{children}</span>
          ) : (
            children
          )}

          {arrow === 'right' && (
            <span className="ml-2">
              <ArrowRight fill={fill} />
            </span>
          )}
        </a>
      </Link>
    )
  }

  return (
    <button className={cn(styles.base, ...btnClass, className)} {...props}>
      {arrow === 'down-bordered' && (
        <div className={'mr-2'}> <Image  src={ArrowDownBordered} alt="btn-icon" /></div>
      )}
      {icon && <div className={'mr-2'}><img  src={icon} alt="btn-icon" /></div>}
      {appearance === 'primary' || gradientBg ? (
        <span>{children}</span>
      ) : (
        children
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  appearance: PropTypes.string.isRequired,
  arrow: PropTypes.string,
  href: PropTypes.string,
  fill: PropTypes.string,
  small: PropTypes.bool,
  flat: PropTypes.bool,
  gradientBg: PropTypes.bool,
}

export default Button
