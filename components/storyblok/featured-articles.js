// import SbEditable from 'storyblok-react'
import { transformStoryblokImg } from '../../utils'
import CardArticleSummary from '../common/cards/card-article-summary'
import Title from '../common/title'
import styles from '../docs/docs-home/articles/index.module.css'

const FeaturedArticles = ({ blok }) => {
  return (
    // <SbEditable content={blok}>
    <div>
      <Title heading="h5" classNames="text-center">
        {blok.subtitle}
      </Title>
      <Title heading="h2" classNames="text-center mt-8">
        {blok.title}
      </Title>
      <div className={styles.cards}>
        {blok.articles.map((card) => {
          const { title, image, intro_text } = card.content

          return (
            <CardArticleSummary
              key={card.id}
              title={title}
              p={intro_text}
              img={transformStoryblokImg(image, '350x250/filters:format(webp)')}
              href={'/blog/' + card.slug}
              date={new Date(card.published_at).toLocaleDateString()}
            />
          )
        })}
      </div>
    </div>
    // </SbEditable>
  )
}

export default FeaturedArticles
