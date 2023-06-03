import PropTypes from 'prop-types'
import Title from '../../title'
import styles from './index.module.css'
import Link from 'next/link'
import cn from 'classnames'

const CardPlatformGray = ({ title, p, icon, btnFill, href, shadow,relatedId,functionOnclick }) => {
  function hrefFunction(e){
   if(href === '#') e.preventDefault()}
   function clicker(){
    functionOnclick(relatedId)
   }
  return (
    <div onClick={functionOnclick && clicker} className={styles.base} >
      <img className={cn(styles.icon, shadow)} src={icon} alt="" />
      <Title heading="h3"> {title} </Title>
      <p className={styles.p}>{p}</p>
      <div className="flex items-center justify-end">
        <Link href={href} onClick={hrefFunction} >
          <a onClick={hrefFunction} className={styles.explore}>
            <span className="mr-3" style={{ color: `${btnFill}` }}>
              Explore
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.107l-1.41 1.41 5.58 5.59H4v2h12.17l-5.58 5.59 1.41 1.41 8-8-8-8z"
                fill={btnFill}
              />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  )
}

CardPlatformGray.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  btnFill: PropTypes.string,
  href: PropTypes.string,
  shadow: PropTypes.string,
}

CardPlatformGray.defaultProps = {
  btnFill: 'var(--relPink)',
  href: '/',
  shadow: 'shadow-platformCardIconPink',
}

export default CardPlatformGray
