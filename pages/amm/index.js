import Exchange from '@/components/amm'
import Head from 'next/head'

const Amm = () => {
  return (
    <>
      <Head>
        <title>Amm | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <Exchange />
    </>
  )
}

export default Amm
