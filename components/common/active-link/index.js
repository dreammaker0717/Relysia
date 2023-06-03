import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

const ActiveLink = ({
  children,
  activatedonLinks,
  activeClassName,
  ...props
}) => {
  const { asPath, pathname } = useRouter()

  const child = Children.only(children)

  const childClassName = child.props.className || ''
  // if(activatedonLinks){
  //   // console.log('$$$$$$$######%%$$$$$$$$######%%')
  //   // console.log(activatedonLinks)
  //   // console.log(asPath)
  // }

  let className =
    asPath === props.href ||
    pathname === props.href ||
    asPath === props.as ||
    asPath.includes(activatedonLinks)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName
  // if()
  return (
    <Link {...props}>
      {React.cloneElement(child, { className: className || null })}
    </Link>
  )
}

ActiveLink.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.object,
  ...{
    href: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
  },
}

export default ActiveLink