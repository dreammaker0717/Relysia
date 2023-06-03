import { transformStoryblokImg } from '../../utils'
import CardArticleSummary from '../common/cards/card-article-summary'
import Title from '../common/title'

const PopularPosts = ({ posts }) => {
  return (
    <div>
      <>
        <Title heading="h3" classNames="mb-8">
          Popular Posts
        </Title>
            <span>
              <CardArticleSummary
                title={posts.title}
                p={posts.excerpt}
                img={posts.featuredImage.node.sourceUrl}
                href={'/blog/' + posts.slug}
                date={posts.date}
                height={250}
              />
            </span>

      </>
    </div>
  )
}

export default PopularPosts