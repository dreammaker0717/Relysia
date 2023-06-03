import * as React from "react"

const StasToken = (props) => (
  <svg
    width={79}
    height={78}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tokena)">
      <rect
        x={15.5}
        y={7}
        width={48}
        height={48}
        rx={6}
        fill="url(#tokenb)"
        shapeRendering="crispEdges"
      />
      <path
        d="M30.647 24.005 45.6 21M31.848 27.788S35.5 27 39 26.5s7.382-.694 7.382-.694m-13.213 6.606S37.372 31.5 40.436 31c3.064-.5 7.267-.57 7.267-.57m-9.91-7.928c.66 1.542 2.252 5.312 2.643 7.267.66 3.304.66 3.964 1.321 11.231"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </g>
    <defs>
      <linearGradient
        id="tokenb"
        x1={12.39}
        y1={33.312}
        x2={68.69}
        y2={55}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E70060" />
        <stop offset={0.974} stopColor="#FC8F0C" />
      </linearGradient>
      <filter
        id="tokena"
        x={0.5}
        y={0}
        width={78}
        height={78}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.996078 0 0 0 0 0.172549 0 0 0 0 0.239216 0 0 0 0.3 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4386_75280"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={8} />
        <feGaussianBlur stdDeviation={7.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.996078 0 0 0 0 0.172549 0 0 0 0 0.239216 0 0 0 0.3 0" />
        <feBlend
          in2="effect1_dropShadow_4386_75280"
          result="effect2_dropShadow_4386_75280"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_4386_75280"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default StasToken
