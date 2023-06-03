import Caption from '../../../common/caption'
import Container from '../../../common/container'
import Title from '../../../common/title'
import styles from './index.module.css'
import Dots from '../../../common/svgs/dots'
import ScrollDown from '../../../common/svgs/scroll-down'
import { useMediaQuery } from '@material-ui/core'
import Image from 'next/image'
const docsPost = require('../../../../assets/images/docs/docs-post.svg')
const docsPostSm = require('../../../../assets/images/docs/docs-post-sm.svg')
const docsHero = require('../../../../assets/images/docs/docs-hero.webp')
const DocsHero = () => {
  const isMobile = useMediaQuery('(max-width: 540px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return (
    <section className={styles.base}>
      <Container classNames="flex flex-col-reverse h-auto lg:h-auto lg:flex-row lg:gap-12">
        <Dots sides={{ bottom: '60px', left: '42px' }} />
        <div className={styles.left}>
          <Caption text="The Complete Guide" />
          <Title
            classNames="my-4"
            heading="h1"
            style={
              isMobile
                ? {
                    fontSize: '12vw',
                  }
                : null
            }
          >
            Documentation
          </Title>
          <p className="text-par">
            Relysia helps businesses to process blockchain payments easily.
            Explore our API and SDK documentation to learn more.
          </p>
          <div className={styles.imgLeftWrapper}>
            <Image
              className={styles.imgLeft}
              src={isMobile ? docsPostSm : docsPost}
              alt="Relysia Docs Post"
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className="w-full h-full">
            <Image  src={docsHero} layout='responsive' alt="Relysia Docs" />  
          </div>
        </div>
        <ScrollDown
          sides={{
            bottom: `${isDesktop ? '20%' : '10%'}`,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Container>
    </section>
  )
}

export default DocsHero
