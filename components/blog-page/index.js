import PropTypes from 'prop-types'
import Dots from '../common/svgs/dots'
import styles from './index.module.css'
import CardArticleSummary from '../common/cards/card-article-summary'
import BlogPost from 'components/storyblok/blog-post'
import PopularPosts from 'components/storyblok/popular-posts'
import SearchInput from 'components/common/inputs/search-input'

const BlogPage = ({ postData }) => {
  const { singlePost, allPosts } = postData
  const filteredPosts = allPosts.filter((post) => post.slug !== singlePost.slug)
  return (
    <div className={styles.container}>
      <section>
        <Dots sides={{ top: '320px', left: '-40px' }} />
        <BlogPost singlePost={singlePost} />
      </section>
      <aside>
        <SearchInput placeholder="Search Article" />
        <div className="mt-10 border-[#583950] border-[0.5px] w-full"></div>
        <div className={styles.asideSection}>
          <PopularPosts posts={filteredPosts[2]} />
        </div>
      </aside>
      <div className={styles.relatedContainer}>
        <h2 classNames="leading-[4.25rem] mb-8">Related Articles</h2>
        <div className={styles.related}>
          {filteredPosts.map((card) => {
            const {
              title,
              featuredImage: {
                node: { sourceUrl },
              },
              excerpt,
            } = card
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
      </div>
    </div>
  )
}

BlogPage.propTypes = {
  story: PropTypes.object.isRequired,
  authorData: PropTypes.object,
  relatedThings: PropTypes.array.isRequired,
  popularPosts: PropTypes.object,
}

export default BlogPage
