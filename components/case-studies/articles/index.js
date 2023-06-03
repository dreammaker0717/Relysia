import Container from '../../common/container'
import styles from './index.module.css'
import DynamicComponent from '../../storyblok/dynamic-component'
import CardArticleSummary from 'components/common/cards/card-article-summary'
const gradientBg = '/assets/images/docs/articles/gradient-bg.svg'

const DocsArticles = ({ allPosts }) => {
  return (
    <section
      className={styles.base}
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 0',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <div className={styles.blogs}>
      {
            allPosts.map((card) => {
              const { title, featuredImage: {node: {sourceUrl}}, excerpt } = card
              return (
                <span key={card.date} className="">
                  <CardArticleSummary
                    title={title}
                    p={excerpt}
                    img={sourceUrl}
                    href={'/blog/' + card.slug}
                    date={card.date}
                    height={250}
                  />
                </span>
              )
            })}
            </div>
      </Container>
    </section>
  )
}

DocsArticles.propTypes = {}

export default DocsArticles
