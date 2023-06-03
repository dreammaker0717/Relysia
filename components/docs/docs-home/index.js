import React from 'react'
import dynamic from 'next/dynamic'
import DocsHero from './hero'
const DownloadOurApp = dynamic(()=>import('../../Layouts/shared-sections/download-our-app'),{ssr:false})
const DocsArticles = dynamic(()=>import('./articles'),{ssr:false})
const DocsPlatform = dynamic(()=>import('./platform'),{ssr:false})
const DocsHome = ({ allPosts }) => {
  return (
    <div className="">
      <DocsHero />
      <DocsPlatform />
      <DocsArticles allPosts={allPosts} />
      {/* <DownloadOurApp /> */}
    </div>
  )
}

export default DocsHome
