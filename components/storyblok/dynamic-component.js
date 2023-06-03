import FeaturedArticles from './featured-articles'
import Page from './page'
import Placeholder from './placeholder'
import BlogPost from './blog-post'
import PopularPosts from './popular-posts'

const Components = {
  'featured-articles': FeaturedArticles,
  post: BlogPost,
  page: Page,
  placeholder: Placeholder,
  'popular-posts': PopularPosts,
}

const DynamicComponent = ({ blok, ...others }) => {
  if (blok?.content?.component) {
    if (typeof Components[blok.content.component] !== 'undefined') {
      const Component = Components[blok.content.component]
      return <Component blok={blok} {...others} />
    }
  }
  if (blok?.component) {
    if (typeof Components[blok.component] !== 'undefined') {
      const Component = Components[blok.component]
      return <Component blok={blok} {...others} />
    }
  }
  return <Placeholder componentName={blok.component} />
}

export default DynamicComponent
