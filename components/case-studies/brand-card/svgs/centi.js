import * as React from "react"
import style from "./index.module.css"
const Centi = (props) => (
  <svg
    // width={130}
    // height={32}
    viewBox="0 0 130 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
    className={style.Centi}
  >
    <path fill="url(#centia)" d="M.131 0h128.941v32H.131z" />
    <defs>
      <pattern
        id="centia"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#centib" transform="matrix(.00321 0 0 .01295 .08 .134)" />
      </pattern>
      <img
        id="centib"
        width={250}
        height={64}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

export default Centi
