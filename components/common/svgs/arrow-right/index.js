import PropTypes from 'prop-types'

const ArrowRight = ({ fill = '#FFFFFF' }) => {
  if (fill === 'red') fill = '#FE2C3D'
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill={('fill-current', fill)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6-1.41-1.41z" />
    </svg>
  )
}

ArrowRight.propTypes = {
  fill: PropTypes.string,
}

export default ArrowRight
