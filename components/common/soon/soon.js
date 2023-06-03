import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'
import soonAnimation from './soon.json'
import { Lottie } from '@/utils/lottie'
const ComingSoon = ({ label, loading, ...props }) => {
  return (
    <div className="flex flex-col justify-evenely items-center pt-6 fontSofiaPro">
      <h1 className="fontSofiaPro" style={{ fontSize: '3rem' }}>
        Coming Soon
      </h1>
      <h1
        className="fontSofiaPro"
        style={{ fontSize: '1rem', fontWeight: '400', marginBottom: '-150px' }}
      >
        Hold, We're Working Hard to get this feature done
      </h1>
      <Lottie animationData={soonAnimation} />
    </div>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  appearance: PropTypes.string.isRequired,
  arrow: PropTypes.string,
  href: PropTypes.string,
  fill: PropTypes.string,
  small: PropTypes.bool,
  flat: PropTypes.bool,
  loading: PropTypes.bool,
}

export default ComingSoon
