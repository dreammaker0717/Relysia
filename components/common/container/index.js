import cn from 'classnames'
import PropTypes from 'prop-types'

const Container = ({ children, classNames }) => {
  return <div className={cn('container', classNames)}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
}

export default Container
