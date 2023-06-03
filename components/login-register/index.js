import styles from './index.module.css'
import PropTypes from 'prop-types'
import Link from 'next/link'
import moment from 'moment'
import { firebaseAuthFunc } from '@/config/init'
import { RecaptchaVerifier } from 'firebase/auth'
import { useEffect } from 'react'

const bg = '/assets/images/bg-rel-phone.png'

const LoginRegister = ({ children }) => {
  const leftBg = {
    backgroundImage: `url(${bg})`,
  }

  useEffect(() => {
    const appVerifier = new RecaptchaVerifier(
      '2fa-captcha',
      {
        size: 'invisible',
      },
      firebaseAuthFunc,
    )
    window.recaptchaVerifier = appVerifier
  }, [])

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <div className="absolute item just inset-0 bg-[#1F1F34]"></div>
        <div className={styles.left} style={leftBg}></div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightContent}>{children}</div>

        <div
          id="2fa-captcha"
          className="flex justify-center items-center mt-3"
        ></div>
        <div className="flex flex-row justify-between w-full px-8">
          <Link href="/privacy-policy" target="_blank">
            Privacy Policy
          </Link>
          <p>Copyright &copy; {`${moment().year()} Vaionex Corporation`}</p>
        </div>
      </div>
    </div>
  )
}

LoginRegister.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LoginRegister

//#1F1F34
