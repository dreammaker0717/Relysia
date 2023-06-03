import { CloudThreeSVG } from '../../components/common/svgs/clouds'
import DemoSvgs from '../../components/common/svgs/demo-svgs'
import FaqsHome from '../../components/faqs'
import Head from 'next/head'

const Faqs = () => {
  return (
    <>
      <Head>
        <title>Faqs | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <DemoSvgs
        icon="pinkLeft"
        sides={{ position: 'absolute', top: '0', left: '0' }}
      />
      <DemoSvgs
        icon="pinkRight"
        sides={{ position: 'absolute', top: '0', right: '0' }}
      />
      <DemoSvgs
        icon="orangeLeft"
        sides={{ position: 'absolute', top: '12%', left: '0' }}
      />
      <CloudThreeSVG top="36%" />
      <FaqsHome />
    </>
  )
}

export default Faqs
