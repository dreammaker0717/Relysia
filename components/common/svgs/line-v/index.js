import PropTypes from 'prop-types'

const LineV = ({ height = '100%', sides = {} }) => {
  return (
    <svg
      width="2"
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        ...sides,
      }}
      className="absolute"
    >
      <path
        d="M1 0v2454"
        stroke="#FF838D"
        strokeOpacity=".4"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

LineV.propTypes = {
  height: PropTypes.string,
  sides: PropTypes.object,
}

export default LineV
