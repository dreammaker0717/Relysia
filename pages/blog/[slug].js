import PropTypes from 'prop-types'
import BlogPage from '../../components/blog-page'
import Container from '../../components/common/container'
import {
  CloudThreeSVG,
  CloudTwoSVG,
  CloudFourSVG,
} from '../../components/common/svgs/clouds'
import Seo from '../../components/common/seo'
import apolloClient from '../../lib/apollo/apollo-client'
import { BLOGPOSTS, SINGLE_POST_BY_SLUG } from '../../lib/apollo/queries'

const BlogDetail = ({ postData }) => {
  const {
    featuredImage: {
      node: { sourceUrl },
    },
    content,
    date,
    slug,
    title,
  } = postData.singlePost
  return (
    <>
      <Seo post={{ sourceUrl, content, date, slug, title }} />
      <div className="page">
        <CloudTwoSVG />
        <CloudThreeSVG top="20%" right="-10%" opacity="0.2" />
        <Container>
          <BlogPage postData={postData} />
        </Container>
      </div>
    </>
  )
}

BlogDetail.propTypes = {
  singlePost: PropTypes.object.isRequired,
}

export async function getServerSideProps({ params }) {
  const response = await apolloClient.query({
    query: SINGLE_POST_BY_SLUG,
    variables: {
      id: params.slug,
      idType: 'SLUG',
    },
  })
  const posts = await apolloClient.query({
    query: BLOGPOSTS,
  })
  const allPosts = posts.data.posts.nodes
  const singlePost = response.data.post
  const postsObj = { allPosts, singlePost }
  return {
    props: {
      postData: postsObj,
    },
  }
}

export default BlogDetail
