import Container from '../../../common/container'
import Image from 'next/image'
import styles from './index.module.css'
import Title from '../../../common/title'
import CardPlatformGray from '../../../common/cards/card-platform-gray'
const graphsSVG = require('../../../../assets/images/docs/graphs.svg')

const apiSVG = '/assets/images/docs/platform/api.svg'
const sdkSVG = '/assets/images/docs/platform/sdk.svg'
const faqSVG = '/assets/images/docs/platform/faq.svg'
const walletSVG = '/assets/images/docs/platform/wallet.svg'
const demoSVG = '/assets/images/docs/platform/demo.svg'
const transactionSVG = '/assets/images/docs/platform/transaction.svg'

const data = [
  {
    id: 1,
    title: 'APIs',
    content: 'Directly access the powerful features of Relysia',
    icon: apiSVG,
    href: 'https://api.relysia.com/docs/static/index.html',
  },
  {
    id: 2,
    title: 'SDKs',
    content: 'Integrate the infrastructure into your application',
    icon: sdkSVG,
    href: 'https://docs.relysia.com',
  },
  {
    id: 3,
    title: 'Demo',
    content: 'A few lines of code to transform any game',
    icon: demoSVG,
    href: '/demo',
  },
  {
    id: 4,
    title: 'Learning',
    content: 'Learn step by step how it works with Satoshi at Satolearn.com',
    icon: transactionSVG,
    href: 'https://satolearn.com/',
  },
  {
    id: 5,
    title: 'FAQs',
    content: 'Got lost? Check the FAQs to get your answers',
    icon: faqSVG,
    href: '/faqs',
  },
  {
    id: 6,
    title: 'Wallet',
    content: 'Explore the Relysia wallet dashboard',
    icon: walletSVG,
    href: '/app/wallet',
  },
]

const DocsPlatform = () => {
  return (
    <section className={styles.base}>
      <Image
        src={graphsSVG}
        alt="Graph"
        layout="responsive"
        className={styles.graphSVG}
      />
      <Container classNames="-mt-1/4">
        <Title heading="h5" classNames="text-center py-1">
          Relysia Infrastructure
        </Title>
        <Title
          heading="h2"
          classNames="text-center max-w-3xl m-auto mt-8 mb-20"
        >
          A technology-<span className="kerning-adjusted">first</span> approach
          to payments and <span className="kerning-adjusted">finance</span>
        </Title>
        <div className={styles.cards}>
          {data.map((card) => (
            <CardPlatformGray
              key={card.id}
              title={card.title}
              p={card.content}
              icon={card.icon}
              href={card.href}
              btnFill={card.id % 2 === 0 ? 'var(--relGreen)' : 'var(--relPink)'}
              shadow={
                card.id % 2 === 0
                  ? 'shadow-platformCardIconGreen'
                  : 'shadow-platformCardIconPink'
              }
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default DocsPlatform
