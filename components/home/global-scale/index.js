import styles from './index.module.css'
import Title from '../../common/title'
import Container from '../../common/container'
import CardWithIcon from '../../common/cards/card-with-icon'
import Image from 'next/image'

const WolrdMapBg = '/assets/images/home-page/global-scale/world-map-bg.webp'
const messageProgrammingSVG =
  require('../../../assets/images/home-page/global-scale/message-programming.svg')
const smsTrackingSVG = require('../../../assets/images/home-page/global-scale/sms-tracking.svg')
const walletCheckSVG = require('../../../assets/images/home-page/global-scale/wallet-check.svg')
const cloudLightningSVG =
  require('../../../assets/images/home-page/global-scale/cloud-lightning.svg')

const data = [
  {
    id: 1,
    title: 'Flexible Invoicing',
    content:
      'We support both BSV and Tokens interoperably for payment invoices.',
    icon: cloudLightningSVG,
  },
  {
    id: 2,
    title: 'Third-party Integrations',
    content:
      'Relysia is a scalable Bitcoin SV wallet infrastructure system for developers.',
    icon: messageProgrammingSVG,
  },
  {
    id: 3,
    title: 'Multi-platform',
    content:
      'Our wallet is available for iOS, Android, and as PWA on Windows and macOS.',
    icon: walletCheckSVG,
  },
  {
    id: 4,
    title: 'Peer to Peer',
    content:
      'We believe in the scalability of p2p payments and natively integrate with them.',
    icon: smsTrackingSVG,
  },
]

const GlobalScale = () => {
  return (
    <section
      className={styles.base}
    >
      <Image
        alt="world-map"
        src={WolrdMapBg}
        layout="fill"
      />
      <Container classNames="h-auto">
        <div className={styles.content}>
          <Title optimised heading="h5">global scale</Title>
          <Title heading="h2" classNames="mt-8 mb-14 w-full md:w-[442px]">
            A complete Bitcoin Wallet, engineered adoption and growth
          </Title>

          <div className={styles.cards}>
            {data.map((item) => (
              <CardWithIcon
                title={item.title}
                icon={item.icon}
                key={item.id}
                p={item.content}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default GlobalScale
