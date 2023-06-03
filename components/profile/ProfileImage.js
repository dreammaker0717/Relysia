import React, { useState } from 'react'

function ProfileImage(props) {
  const [displayImage, setdisplayImage] = useState(false)
  return (
    <img
      style={{
        maxHeight: 100,
        maxWidth: 100,
        display: displayImage ? 'inline-block' : 'none',
      }}
      src={props.src}
      alt="image"
      onError={props.onError}
      className="img-responsive center-block"
      height={100}
      width={100}
      onLoad={() => setdisplayImage(true)}
    />
  )
}
export default ProfileImage
