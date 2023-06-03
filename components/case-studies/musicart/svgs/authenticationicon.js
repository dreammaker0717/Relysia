import * as React from "react"

const AuthenticationIcon = (props) => (
  <svg
    width={79}
    height={78}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#autha)">
      <rect
        x={15.167}
        y={7}
        width={48}
        height={48}
        rx={6}
        fill="url(#authb)"
        shapeRendering="crispEdges"
      />
      <path
        d="M39.167 33.88c-.91 0-1.65-.74-1.65-1.65v-2.47c0-.91.74-1.65 1.65-1.65.91 0 1.65.74 1.65 1.65v2.47c0 .91-.74 1.65-1.65 1.65Z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M44.147 32.47c-.2 2.58-2.36 4.6-4.98 4.6-2.76 0-5-2.24-5-5v-2.14c0-2.76 2.24-5 5-5 2.59 0 4.72 1.97 4.97 4.49"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M42.167 21h2c3 0 5 2 5 5v2M29.167 28v-2c0-3 2-5 5-5h2M42.167 41h2c3 0 5-2 5-5v-2M29.167 34v2c0 3 2 5 5 5h2"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <linearGradient
        id="authb"
        x1={12.057}
        y1={33.312}
        x2={68.357}
        y2={55}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E70060" />
        <stop offset={0.974} stopColor="#FC8F0C" />
      </linearGradient>
      <filter
        id="autha"
        x={0.167}
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
          result="effect1_dropShadow_4386_75295"
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
          in2="effect1_dropShadow_4386_75295"
          result="effect2_dropShadow_4386_75295"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_4386_75295"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default AuthenticationIcon
