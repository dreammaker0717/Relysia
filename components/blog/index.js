import { useState } from 'react'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'
import CardArticleSummary from '../common/cards/card-article-summary'
import Container from '../common/container'
import Title from '../common/title'
import styles from './index.module.css'
import Dots from '../common/svgs/dots'

const gradientBg = '/assets/images/docs/articles/gradient-bg.svg'
const BlogHome = ({ allPost }) => {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const perPage = 7
  const getPageCount = Math.ceil(allPost.length / perPage)

  const handlePageClick = ({ selected }) => {
    const path = router.pathname
    const query = router.query

    query.page = selected + 1
    router.push({
      pathname: path,
      query: query,
    })

    setPage(() => selected + 1)
  }

  return (
    <section
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 750px',
        backgroundSize: 'contain',
        overflow: 'auto',
      }}
    >
      <Container classNames="my-20">
        <Dots sides={{ top: '220px', left: '-40px' }} />
        <Title heading="h2" classNames=" leading-normal">
          Relysia Blog
        </Title>
        <p className="text-par w-80 my-6 mb-14">
          Found the articles that make your work life easier.
        </p>
        <div className="flex justify-center mb-14"></div>
        <div className={styles.base}>
          {allPost.map((card, i) => {
            const {
              title,
              featuredImage: {
                node: { sourceUrl },
              },
              excerpt,
            } = card
            const horizontal = i === 0 ? true : false

            return (
              <span
                key={card.date}
                className={`${i === 0 ? styles.first : ''}`}
              >
                <CardArticleSummary
                  title={title}
                  p={excerpt}
                  img={sourceUrl}
                  href={'/blog/' + card.slug}
                  date={card.date}
                  horizontal={horizontal}
                  height={horizontal ? 300 : 250}
                />
              </span>
            )
          })}
        </div>
        <div className={styles.paginationWrapper}>
          <ReactPaginate
            previousLabel={
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 14.003L6.265 9.77a.375.375 0 010-.531L10.5 5.003"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            nextLabel={
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 14.003l4.235-4.234a.375.375 0 000-.531L7.5 5.003"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            previousClassName={styles.prev}
            nextClassName={styles.next}
            breakLabel={'...'}
            pageCount={getPageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            disabledClassName={styles.disabled}
            forcePage={page - 1}
          />
        </div>
      </Container>
    </section>
  )
}

BlogHome.propTypes = {
  stories: PropTypes.array.isRequired,
}

export default BlogHome
