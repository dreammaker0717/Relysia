import PropTypes from 'prop-types'
import Container from '../../../components/common/container'
import Title from '../../../components/common/title'
import styles from './index.module.css'
import Image from 'next/image'
import Dots from '../../../components/common/svgs/dots'
const platform1svg = require('../../../assets/images/home-page/platform/platform1.svg')
const platform2svg = require('/assets/images/home-page/platform/platform2.svg')
const platform3svg = require('/assets/images/home-page/platform/platform3.svg')

const platformData = [
  {
    id: 1,
    title: 'Improving platform',
    content:
      'The Vaionex team is fully committed to extending feature functionality on a daily basis, with sometimes multiple commits per day.',
    image: platform1svg,
  },
  {
    id: 2,
    title: 'Battle-tested reliability',
    content:
      'Our systems operate with 99.9%+ uptime and are highly scalable and redundant. Relysia is certified to the highest compliance standards.',
    image: platform2svg,
  },
  {
    id: 3,
    title: 'No Transaction Fees',
    content:
      'Our systems automatically add transaction fees to your transactions. We believe it is an essential feature to simplify blockchain adoption.',
    image: platform3svg,
  },
]

const Platform = ({ platformRef }) => {
  return (
    <section
      className={styles.platform}
      ref={platformRef}
      style={{ width: '100vw' }}
    >
      <Container classNames="pb-52">
        <Dots sides={{ bottom: '22px', left: '-156px' }} />
        <Dots sides={{ bottom: '22px', left: '30%' }} />
        <Title heading="h5" classNames="text-center py-1">
          The Future of Blockchain
        </Title>
        <Title
          heading="h2"
          classNames="text-center max-w-3xl m-auto mt-8 mb-8 lg:mb-20"
        >
          A technology-<span className="kerning-adjusted">first</span> approach
          to payments and <span className="kerning-adjusted">finance</span>
        </Title>
        <div className={styles.wrapper}>
          {platformData.map((card) => (
            <div className={styles.card} key={card.id}>
              <div className={styles.img}>
                {' '}
                <Image
                  layout="responsive"
                  src={card.image}
                  alt={card.title}
                />{' '}
              </div>
              <div className={styles.title}>{card.title}</div>
              <p className={styles.p}>{card.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

Platform.propTypes = {
  platformRef: PropTypes.object,
}

export default Platform
