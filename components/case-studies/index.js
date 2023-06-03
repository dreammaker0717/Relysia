import Hero from './hero'
import React, { useRef } from 'react'
import MusicArt from './musicart'
import My2Cents from './my2cents'
import Centi from './centi-case-study'
import Curious from './curious'
import backgroundLg from '../../assets/images/backgroundLg.png'

const CaseStudyMain = () => {
  const platformRef = useRef()
  const goToPlatform = () => {
    platformRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const backgroundImage = {
    backgroundImage: `url(${backgroundLg.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <>
      <div style={backgroundImage}>
        <Hero goToPlatform={goToPlatform} />
        <MusicArt />
        <My2Cents />
        <Centi />
        <Curious />
      </div>
    </>
  )
}

export default CaseStudyMain
