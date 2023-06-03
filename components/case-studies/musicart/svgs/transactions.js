import * as React from "react"

const Transactions = (props) => (
  <svg
    width={79}
    height={78}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#transa)">
      <rect
        x={15.833}
        y={7}
        width={48}
        height={48}
        rx={6}
        fill="url(#transb)"
        shapeRendering="crispEdges"
      />
      <path
        d="M35.833 30.4c0 .77.6 1.4 1.33 1.4h1.5c.64 0 1.16-.55 1.16-1.22 0-.73-.32-.99-.79-1.16l-2.4-.84c-.48-.17-.8-.43-.8-1.16 0-.67.52-1.22 1.16-1.22h1.5c.74.01 1.34.63 1.34 1.4M37.833 31.85v.74M37.833 25.41v.78"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.823 36.98a7.99 7.99 0 1 0 0-15.98 7.99 7.99 0 0 0 0 15.98ZM40.813 38.88c.9 1.27 2.37 2.1 4.05 2.1 2.73 0 4.95-2.22 4.95-4.95 0-1.66-.82-3.13-2.07-4.03"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <linearGradient
        id="transb"
        x1={12.723}
        y1={33.312}
        x2={69.023}
        y2={55}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E70060" />
        <stop offset={0.974} stopColor="#FC8F0C" />
      </linearGradient>
      <filter
        id="transa"
        x={0.833}
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
          result="effect1_dropShadow_4386_75289"
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
          in2="effect1_dropShadow_4386_75289"
          result="effect2_dropShadow_4386_75289"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_4386_75289"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default Transactions
