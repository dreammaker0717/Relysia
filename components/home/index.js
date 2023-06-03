
import Hero from './hero'
import React, { useRef } from 'react'
// import dynamic from 'next/dynamic'
const Platform = dynamic(() => import('./platform'))
const ValueForService = dynamic(() => import('../Layouts/shared-sections/value-for-service'))
const ApiSection = dynamic(() => import('./api-section'))
const GlobalScale = dynamic(() => import('./global-scale'))
// const Pricing = dynamic(() => import('../Layouts/Pricing'))

// import Platform from './platform'
// import ValueForService from '../Layouts/shared-sections/value-for-service'
// import ApiSection from './api-section'
// import GlobalScale from './global-scale'
// import Pricing from '../Layouts/Pricing'
import dynamic from 'next/dynamic'
const HomeMain = () => {
  const platformRef = useRef()
  const goToPlatform = () => {
    // setShowContent(true)
    platformRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero goToPlatform={goToPlatform} />
      <Platform platformRef={platformRef} />
      <ApiSection />
      <GlobalScale />
      <ValueForService />
      {/*<Pricing />*/}
    </>
  )

}

export default HomeMain
