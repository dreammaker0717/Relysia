import PropTypes from 'prop-types'

const ScrollDown = ({ sides = {} }) => {
  return (
    <div  className="absolute flex flex-col items-center" style={{ ...sides }}
    >
      <svg
        width="40"
        height="51"
        viewBox="0 0 40 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity=".6" filter="url(#filter0_f)">
          <rect
            x="11.152"
            y="11.438"
            width="17.696"
            height="28"
            rx="8.848"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
          />
        </g>
        <rect
          x="11.152"
          y="11.438"
          width="17.696"
          height="28"
          rx="8.848"
          stroke="url(#paint1_linear)"
          strokeWidth="2"
        />
        <path
          d="M20 16.756v5.727"
          stroke="url(#paint2_linear)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="8.876"
            y1="26.883"
            x2="33.811"
            y2="33.189"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="8.876"
            y1="26.883"
            x2="33.811"
            y2="33.189"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="19.935"
            y1="19.895"
            x2="21.276"
            y2="19.986"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
          <filter
            id="filter0_f"
            x=".152"
            y=".438"
            width="39.696"
            height="50"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>

      <span className="text-sm">Scroll to Explore</span>
    </div>
  )
}

ScrollDown.propTypes = {
  sides: PropTypes.object,
}

export default ScrollDown
