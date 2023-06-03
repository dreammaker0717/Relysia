import NoSSR from '@/utils/noSSR'
import Head from 'next/head'
import WithAuthProtection from '@/hooks/authProtection'

function Checkout() {
  return (
    <NoSSR>
      <Head>
        <title>Invoice Checkout | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="col-12" style={{ backgroundColor: `white` }}></div>
    </NoSSR>
  )
}

export default WithAuthProtection(Checkout)
