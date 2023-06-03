import { useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import SharedLayout from '../components/Layouts/shared-layout'
import { DefaultSeo } from 'next-seo'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import '../static/css/slick.css'
import '../static/css/animate.css'
// import '../static/css/flaticon.css'
// import '../static/css/boxicons.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/react-modal-video/css/modal-video.min.css'
import '../static/styles/style.css'
import './app/app.css'

import '../static/styles/brink-pink-style.css'
import '../static/css/responsive.css'
import '../static/css/custom.css'
import '../components/Layouts/dashboardsidebar.css'
import '../static/styles/GlobalNewDocsContainer.css'

// tailwindcss
import 'tailwindcss/tailwind.css'
import '../assets/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  firebaseGetAuthorizedUser,
  firebaseOnIdTokenChange,
} from '@/firebase/auth'
import { updateUserDataAction } from '@/redux/slices/auth'

const SEO = {
  title: 'Relysia Wallet',
  description:
    'Relysia is a feeless Bitcoin wallet and development infrastructure.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://relysia.com',
    title: 'Relysia Wallet',
    description:
      'Relysia is a feeless Bitcoin wallet and development infrastructure.',
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
    cardType: 'summary_large_image',
  },
  canonical: 'https://www.relysia.com',
}

const App = ({ Component, pageProps, ...props }) => {
  const { pathname } = props.router

  useEffect(() => {
    function changeThemeColor() {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      if (pathname.includes('app')) {
        metaThemeColor.setAttribute('content', '#ffffff')
      } else {
        metaThemeColor.setAttribute('content', '#1C1936')
      }
      setTimeout(function () {
        changeThemeColor()
      }, 5)
    }

    changeThemeColor()
    const isInStandaloneMode = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')

    if (isInStandaloneMode()) {
      props.router.push('/auth/login')
    }

    const unsubscribe = firebaseGetAuthorizedUser()
    firebaseOnIdTokenChange()

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const authToken = localStorage.getItem('auth__token');
    if (!authToken) {
      store.dispatch(updateUserDataAction(null)
      )
    }
  })

  return (
    <GoogleOAuthProvider clientId="542054524968-re9q73fdbl6t9qnl69ia79plrdpfn9td.apps.googleusercontent.com">
      <DefaultSeo {...SEO} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
      </Head>

      <Provider store={store}>
        <SharedLayout router={props.router}>
          <Component {...pageProps} router={props.router} />
        </SharedLayout>
        <ToastContainer />
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
