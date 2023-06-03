import dynamic from 'next/dynamic'

const ActiveLink = dynamic(() => import('../../common/active-link'))
const Container = dynamic(() => import('../../common/container'))
const Logo = dynamic(() => import('../../common/logo'))

const DesktopHeader = ({
  userData,
  checkWalletDataForLink,
  renderSignInOut,
  styles,
  pathname,
  Link,
}) => {
  return (
    <header
      className={
        pathname.includes('app/') || pathname.includes('dashboard/')
          ? styles.headerWhite
          : styles.header
      }
    >
      <Container classNames="flex justify-between items-center">
        <Link href={userData ? '/?loggedin=true' : '/'}>
          <a>
            <Logo />
          </a>
        </Link>
        <nav className={styles.nav}>
          {/* <ActiveLink
            href={userData ? '/?loggedin=true' : '/'}
            activeClassName={styles.active}
          >
            <a
              className={
                !(pathname.includes('app/') || pathname.includes('dashboard/'))
                  ? styles.navItem
                  : styles.navItemWhite
              }
            >
              Home
            </a>
          </ActiveLink> */}
          {userData && (
            <ActiveLink
              href={checkWalletDataForLink}
              activeClassName={styles.active}
              activatedonLinks="app/"
            >
              <a
                className={
                  !(
                    pathname.includes('app/') || pathname.includes('dashboard/')
                  )
                    ? styles.navItem
                    : styles.navItemWhite
                }
              >
                Wallet
              </a>
            </ActiveLink>
          )}
          <ActiveLink href="/demo" activeClassName={styles.active}>
            <a
              className={
                !(pathname.includes('app/') || pathname.includes('dashboard/'))
                  ? styles.navItem
                  : styles.navItemWhite
              }
            >
              Demo
            </a>
          </ActiveLink>

          <ActiveLink href="/docs" activeClassName={styles.active}>
            <a
              className={
                !(pathname.includes('app/') || pathname.includes('dashboard/'))
                  ? styles.navItem
                  : styles.navItemWhite
              }
            >
              Docs
            </a>
          </ActiveLink>
          {/* <ActiveLink href="/blog" activeClassName={styles.active}>
              <a
                className={
                  !pathname.includes('app/')
                    ? styles.navItem
                    : styles.navItemWhite
                }
              >
                Blog
              </a>
            </ActiveLink> */}

          <ActiveLink href="/case-studies" activeClassName={styles.active}>
            <a
              className={
                !(pathname.includes('app/') || pathname.includes('dashboard/'))
                  ? styles.navItem
                  : styles.navItemWhite
              }
            >
              Clients
            </a>
          </ActiveLink>
        </nav>
        {renderSignInOut(false)}
      </Container>
    </header>
  )
}
export default DesktopHeader
