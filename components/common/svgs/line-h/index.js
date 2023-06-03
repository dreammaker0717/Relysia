import PropTypes from 'prop-types'

const LineH = ({ width = '100vw', sides }) => {
  return (
    <svg
      width={width}
      height="2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...sides,
      }}
      className="absolute z-5"
    >
      <path
        d="M0 1h5000"
        stroke="#FF838D"
        strokeOpacity="0.4"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

LineH.propTypes = {
  width: PropTypes.string,
  sides: PropTypes.object,
}

export default LineH
