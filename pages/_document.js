import Document, { Html, Head, Main, NextScript } from 'next/document'
import { NextSeo } from 'next-seo'

const SEO = {
  title: 'Relysia Wallet',
  description: 'Relysia is a feeless Bitcoin wallet and development infrastructure.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://relysia.com',
    title: "Relysia Wallet",
    description: 'Relysia is a feeless Bitcoin wallet and development infrastructure.',
    site_name: 'Relysia',
    images: [
      {
        url: 'https://i.imgur.com/2E9WLqH.png',
        width: 800,
        height: 600,
        alt: 'Relysia Image',
      },
    ],
  },
  twitter: {
    handle: '@Relysia_SV',
    site: '@Relysia_SV',
    cardType: 'summary_large_image'
  },
  canonical: 'https://www.relysia.com'
}
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta charSet="utf-8" /> 
      
          <meta property="og:locale" content="en_IE" />*/}
          <link rel="icon" type="image/png" href={'/images/favicon.ico'}></link>
          <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
          <meta name="application-name" content="Relysia Wallet" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Relysia" />
          <meta
            name="description"
            content="Relysia is a feeless Super Wallet and Bitcoin developer infrastructure."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />

          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#2e2e47" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/icons/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/icons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/icons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/icons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon-180x180.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2e2e47" />
          <meta name="apple-mobile-web-app-title" content="Relysia Wallet" />
          <meta name="application-name" content="Relysia Wallet" />
          <meta name="msapplication-TileColor" content="#2e2e47" />
          <meta
            name="msapplication-TileImage"
            content="/mstile-144x144.png"
          ></meta>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="title" content="Relysia Wallet" />
          <meta name="description" content="Relysia is a feeless Super Wallet and Bitcoin developer infrastructure." />
          <meta property="og:url" content="http://relysia.com" />
          <link
            href="splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          {/* <script id="quickchat_script" scenario_id="ehf9g4lnds" type='text/javascript' src="https://quickchat.ai/user_kit/quickchat.js" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument