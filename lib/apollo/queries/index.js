import { gql } from '@apollo/client'

export const BLOGPOSTS = gql`
  query blogPostQuery {
    posts(first: 10) {
      nodes {
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        excerpt
        content
        date
        categories {
          nodes {
            slug
            name
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`

export const SINGLE_POST_BY_SLUG = gql`
  query blogPostQuery($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      title
      slug
      date
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`