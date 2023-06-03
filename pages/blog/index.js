import PropTypes from 'prop-types'
import BlogHome from '../../components/blog'
import Container from '../../components/common/container'
import Head from 'next/head'

import apolloClient from '../../lib/apollo/apollo-client'
import { BLOGPOSTS } from '../../lib/apollo/queries'

const Blog = ({ allPost }) => {
  if (!allPost || !allPost.length) {
    return (
      <>
        <Head>
          <title>Blog | Relysia</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
          />
        </Head>
        <div className="page min-h-[64vh]">
          <Container classNames="pt-12">
            <p>Something went wrong... Turn to Home page</p>
          </Container>
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Blog | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <div className="page">
        <BlogHome allPost={allPost} />
      </div>
    </>
  )
}

Blog.propTypes = {
  allPost: PropTypes.array.isRequired,
}

export async function getStaticProps({ preview }) {
  let params = {
    version: 'draft', // or 'published'
    starts_with: 'articles/',
    filter_query: {
      component: {
        in: 'post',
      },
    },
  }

  const BlogPosts = await apolloClient.query({
    query: BLOGPOSTS,
  })

  const allPost = BlogPosts.data.posts.nodes

  if (preview) {
    params.version = 'draft'
    params.cv = Date.now()
  }

  return {
    props: {
      allPost,
      preview: preview || false,
    },
    revalidate: 1,
  }
}

export default Blog
