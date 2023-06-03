import * as React from "react"

const MedianResponse = (props) => (
  <svg
    width={79}
    height={78}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#mediana)">
      <rect
        x={15.5}
        y={7}
        width={48}
        height={48}
        rx={6}
        fill="url(#medianb)"
        shapeRendering="crispEdges"
      />
      <path
        d="M49.5 34c0 3.87-3.13 7-7 7l1.05-1.75M29.5 28c0-3.87 3.13-7 7-7l-1.05 1.75M41.2 23.45l3.98 2.3 3.94-2.29M45.18 29.82v-4.08"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m44.24 21.21-2.4 1.33c-.54.3-.99 1.06-.99 1.68v2.54c0 .62.44 1.38.99 1.68l2.4 1.33c.51.29 1.35.29 1.87 0l2.4-1.33c.54-.3.99-1.06.99-1.68v-2.54c0-.62-.44-1.38-.99-1.68l-2.4-1.33c-.51-.28-1.35-.28-1.87 0ZM29.85 34.45l3.97 2.3 3.95-2.29M33.82 40.82v-4.08"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m32.89 32.21-2.4 1.33c-.54.3-.99 1.06-.99 1.68v2.54c0 .62.44 1.38.99 1.68l2.4 1.33c.51.29 1.35.29 1.87 0l2.4-1.33c.54-.3.99-1.06.99-1.68v-2.54c0-.62-.44-1.38-.99-1.68l-2.4-1.33c-.52-.28-1.36-.28-1.87 0Z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <linearGradient
        id="medianb"
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
        id="mediana"
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
          result="effect1_dropShadow_4386_75302"
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
          in2="effect1_dropShadow_4386_75302"
          result="effect2_dropShadow_4386_75302"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_4386_75302"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default MedianResponse
