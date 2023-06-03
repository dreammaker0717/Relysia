import React, { useRef, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Image from 'next/image'

function ErrorHandlingAvatar({ src, alt, className }) {
  const [imageSrc, setImageSrc] = useState(src)

  const handleError = () => {
    setImageSrc('/nft_placeholder.png')
  }

  return (
    <Avatar className={className}>
      <Image quality={50} src={imageSrc} alt={alt} layout="fill" onError={handleError} />
    </Avatar>
  )
}

export default ErrorHandlingAvatar
