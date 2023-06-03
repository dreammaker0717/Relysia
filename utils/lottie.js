import { useEffect, useRef } from 'react'

import lottie from 'lottie-web'
import PropTypes from 'prop-types'

export const Lottie = ({ animationData }) => {
  const element = useRef(null)
  const lottieInstance = useRef()

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
        container: element.current,
      })
    }
  }, [animationData])

  return <div ref={element}></div>
}

Lottie.propTypes = {
  animationData: PropTypes.any.isRequired,
}
