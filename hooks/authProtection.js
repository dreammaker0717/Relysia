import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import authSelector from '@/redux/selectors/auth'

const NotLoggedIn = () => {
  return <div></div>
}

const WithAuthProtection = (Component) => {
  const Authenticated = () => {
    const router = useRouter()
    const { userData, checked } = useSelector(authSelector)

    useEffect(() => {
      if (!userData && checked) {
        router.replace('/')
      }
    }, [userData, router, checked])

    return userData ? <Component /> : <NotLoggedIn />
  }

  return Authenticated
}

export default WithAuthProtection
