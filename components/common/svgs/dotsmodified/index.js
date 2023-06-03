import PropTypes from 'prop-types'

const DotsModified = ({ sides = {} }) => {
  return (
    <svg
      width="156"
      height="144"
      viewBox="0 0 156 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{
        ...sides,
      }}
    >
      <line
        x1="153.443"
        y1="95.63"
        x2="153.443"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
      <line
        x1="123.443"
        y1="95.63"
        x2="123.443"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
      <line
        x1="93.4431"
        y1="95.63"
        x2="93.4431"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
      <line
        x1="63.4431"
        y1="95.63"
        x2="63.4431"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
      <line
        x1="33.4431"
        y1="95.63"
        x2="33.4431"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
      <line
        x1="3.44309"
        y1="95.63"
        x2="3.44309"
        y2="2.55692"
        stroke="#FFCCD0"
        strokeOpacity="0.3"
        strokeWidth="5.11383"
        strokeLinecap="round"
        strokeDasharray="0.24 29.77"
      />
    </svg>
  )
}

DotsModified.propTypes = {
  sides: PropTypes.object,
}

export default DotsModified
