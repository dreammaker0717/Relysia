import NoSSR from '@/utils/noSSR'
import DocsHome from '../../components/docs/docs-home'
import { CloudThreeSVG } from '../../components/common/svgs/clouds'
import Head from 'next/head'
// The Storyblok Client
import apolloClient from '../../lib/apollo/apollo-client'
import { BLOGPOSTS } from '../../lib/apollo/queries'

const Docs = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>Documentation | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <NoSSR>
        <>
          <CloudThreeSVG top="20%" opacity="0.2" />
          <CloudThreeSVG top="62%" />
          <DocsHome allPosts={allPosts} />
        </>
      </NoSSR>
    </>
  )
}

export async function getStaticProps(context) {
  const posts = await apolloClient.query({
    query: BLOGPOSTS,
  })
  const allPosts = posts.data.posts.nodes

  return {
    props: {
      allPosts,
    },
    revalidate: 10,
  }
}

export default Docs
