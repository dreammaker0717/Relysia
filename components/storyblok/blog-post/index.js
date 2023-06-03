import Image from 'next/image'
import ReactHtmlParser from 'html-react-parser'
import Title from '../../common/title'
import styles from './index.module.css'

import BlogSocialIcon from '../../common/svgs/blog-social-icon'
import { formatBlogDate } from '../../../utils'
import Link from 'next/link'

const userAvatar = '/assets/images/user.png'

const BlogPost = ({ singlePost }) => {
  return (
    <>
      <div>
        <div className="flex flex-row mb-5 items-center">
          <Link href="/home">Home</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>Blog</span>
        </div>
        <h1 className={styles.header}>{singlePost.title}</h1>
        <div className={styles.authorWrapper}>
          <div className={styles.author}>
            <img className={styles.avatar} src={'/rob-100.jpg'} alt={'Rob'} />
            <div className="flex flex-col">
              <span>Robin Kohze</span>
              <span className="text-placeholder">
                {formatBlogDate(singlePost.date)}
              </span>
            </div>
          </div>
          <div className={styles.icons}>
            <a
              href={`https://www.instagram.com/reylsia`}
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <BlogSocialIcon iconType="instagram" />
            </a>

            <a
              href={`https://www.twitter.com/relysia`}
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <BlogSocialIcon iconType="twitter" />
            </a>

            <a
              href={`https://www.facebook.com/relysia`}
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <BlogSocialIcon iconType="facebook" />
            </a>
          </div>
        </div>
        <div className={styles.imgWrapper}>
          {/* <image
          className={styles.img}
          src={`https:${image}`}
          alt={title}
          width={700}
          height={700}
          layout="responsive"
        /> */}
        </div>
        <div className="blog-post-content prose lg:prose-xl">
          {ReactHtmlParser(singlePost.content)}
        </div>
      </div>
    </>
  )
}

export default BlogPost
