import dynamic from 'next/dynamic'

const ActiveLink = dynamic(() => import('../../common/active-link'))
const Caption = dynamic(() => import('../../common/caption'))
const Logo = dynamic(() => import('../../common/logo'))

const APIComp = ({
  userData,
  checkWalletDataForLink,
  renderSignInOut,
  styles,
  Link
}) => {
  return (
    <header className={styles.headerApi}>
      <div className="flex item-center">
        <Link href={userData ? '/?loggedin=true' : '/'}>
          <a>
            <Logo />
          </a>
        </Link>
        <Caption text="API" classNames="text-white ml-4" />
      </div>
      <nav className={styles.nav}>
        <ActiveLink
          href={userData ? '/?loggedin=true' : '/'}
          activeClassName={styles.active}
        >
          <a className={styles.navItem}>Home</a>
        </ActiveLink>
        <ActiveLink href="/docs" activeClassName={styles.active}>
          <a className={styles.navItem}>Docs</a>
        </ActiveLink>
        {/* <ActiveLink href="/blog" activeClassName={styles.active}>
            <a className={styles.navItem}>Blog</a>
          </ActiveLink> */}
        {userData && (
          <ActiveLink
            href={checkWalletDataForLink}
            activatedonLinks="app/wallet"
            activeClassName={styles.active}
          >
            <a className={styles.navItem}>Wallet</a>
          </ActiveLink>
        )}
        <ActiveLink href="/demo" activeClassName={styles.active}>
          <a className={styles.navItem}>Demo</a>
        </ActiveLink>
      </nav>
      <div>{renderSignInOut(false)}</div>
    </header>
  )
}
export default APIComp
