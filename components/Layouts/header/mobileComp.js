import {
  Divider,
  AppBar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  MenuItem,
  MenuList,
  ListItemText,
} from '@material-ui/core'

import cn from 'classnames'
import dynamic from 'next/dynamic'
import React from 'react'
import { useRouter } from 'next/router'
const MaterialUiCustomButtom = dynamic(() =>
  import('../../common/materialUi-button'),
)
const Logo = dynamic(() => import('../../common/logo'))

const RenderMobileMenu = ({
  userData,
  checkWalletDataForActiveLink,
  checkWalletDataForLink,
  styles,
  pathname,
  userPanel,
  serUserPanel,
  Link,
  signOutFunction,
}) => {
  const router = useRouter()
  const [leftPanel, setLeftPanel] = React.useState(false)
  React.useEffect(() => {
    if (leftPanel) {
      setLeftPanel(false)
    }
    if (userPanel) {
      serUserPanel(false)
    }
  }, [pathname])

  function getTwoNames(displayName) {
    if (!displayName) return ''
    const array = displayName.split(' ')
    return array.length > 2
      ? `${array[0]} ${array[array.length - 1]}`
      : displayName
  }
  const handleMenu = (event) => {
    setLeftPanel(true)
  }

  const handleClose = () => {
    setLeftPanel(false)
  }
  const handleuserPanel = (event) => {
    serUserPanel(true)
  }

  const handleCloseuserPanel = () => {
    serUserPanel(false)
  }
  const classNameHandler = () => {
    return pathname.includes('/app')
      ? styles.navItemWhiteMobile
      : styles.navItemMobile
  }
  const sendto = (e) => {
    e.persist()
    // console.log(e.currentTarget.value)
    if (e.currentTarget.getAttribute('value')) {
      router.push(e.currentTarget.getAttribute('value'))
    }
  }
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: pathname.includes('app/')
            ? 'white'
            : 'rgba(46, 46, 71, 1)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '15px',
          paddingRight: '15px',
          boxShadow: '0px 0px 0px white',
          borderBottom: '0px',
        }}
      >
        <div className={styles.mobileHeaderItem}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            style={{
              background: 'rgba(65, 65, 241, 0.05)',
              borderRadius: '12px',
              marginLeft: '7px',
              height: '80%',
              color: pathname.includes('app/') ? '#292D32' : 'white',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </IconButton>
        </div>
        <div className={cn(styles.mobileHeaderItem, styles.mobileLogo)}>
          <Logo />
        </div>
        <div
          className={cn(styles.mobileHeaderItem, styles.mobileHeaderItemLast)}
        >
          {userData ? (
            <IconButton
              edge="end"
              size="medium"
              aria-label="account of current user"
              // aria-controls="menu-appbar"
              // aria-haspopup="true"
              onClick={handleuserPanel}
              color="inherit"
            >
              {userData.photoURL ? (
                <Avatar alt={userData.displayName} src={userData.photoURL} />
              ) : (
                <Avatar
                  style={{
                    background:
                      'linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)',
                  }}
                >
                  {userData.displayName?.match(/\b\w/g)?.join('') || ''}
                </Avatar>
              )}
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              size="medium"
              aria-label="account of current user"
              // aria-controls="menu-appbar"
              // aria-haspopup="true"
              onClick={handleuserPanel}
              color="inherit"
            >
              <Avatar />
            </IconButton>
          )}
        </div>

        <SwipeableDrawer
          anchor={'left'}
          open={leftPanel}
          onClose={handleClose}
          onOpen={handleMenu}
          PaperProps={{
            elevation: 0,
            className: styles.headermobile,
            style: {
              height: '~"100vh - 100px"',
              width: '60%',
              backgroundColor: pathname.includes('/app') ? 'white' : '#2e2e47',
              color: pathname.includes('/app') ? 'black' : 'white',
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            },
          }}
        >
          <MenuList>
            <MenuItem className="cross-icon">
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 5,
                  color: 'rgba(255, 145, 153, 1)',
                }}
                onClick={() => setLeftPanel(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </MenuItem>

            <Link href="/" passHref>
              <MenuItem
                selected={pathname === '/'}
                className={`${classNameHandler()} ${
                  pathname === '/' && styles.active
                } cross-icon`}
              >
                <ListItemText>Home</ListItemText>
              </MenuItem>
            </Link>
            <Link href="/docs" passHref>
              <MenuItem
                style={{ height: '5.6vh' }}
                selected={pathname.includes('docs')}
                className={`${classNameHandler()} ${
                  pathname.includes('docs') && styles.active
                } cross-icon`}
              >
                <ListItemText>Docs</ListItemText>
              </MenuItem>
            </Link>

            {userData && (
              <Link href={checkWalletDataForLink} passHref>
                <MenuItem
                  style={{ height: '5.6vh' }}
                  selected={pathname.includes(checkWalletDataForActiveLink)}
                  className={`${classNameHandler()} ${
                    pathname.includes(checkWalletDataForActiveLink) &&
                    styles.active
                  } cross-icon`}
                >
                  <ListItemText>Wallet</ListItemText>
                </MenuItem>
              </Link>
            )}
            <Link href="/demo" passHref>
              <MenuItem
                style={{ height: '5.6vh' }}
                selected={pathname.includes('/demo')}
                className={`${classNameHandler()} ${
                  pathname.includes('/demo') && styles.active
                } cross-icon`}
              >
                <ListItemText>Demo</ListItemText>
              </MenuItem>
            </Link>
            <Link href="/blog" passHref>
              <MenuItem
                style={{ height: '5.6vh' }}
                selected={pathname.includes('/blog')}
                className={`${classNameHandler()} ${
                  pathname.includes('/blog') && styles.active
                } cross-icon`}
              >
                <ListItemText>Blog</ListItemText>
              </MenuItem>
            </Link>
            {/* {headerLinks &&
                  headerLinks.length > 0 &&
                  headerLinks.map((elem, index) => (
               <div style={{height:'5.6vh'}}>
                  <MenuItem className={
                    !pathname.includes(elem.activeLink)
                      ? styles.navItemWhiteMobile
                      : `${styles.navItemWhiteMobile} && ${styles.active}`
                  }>
                      <ListItemText    >{elem.name}</ListItemText>
                    </MenuItem>
                    </div>

                  ))} */}
            <Divider />
            {/* <MenuItem>
                  <ListItemIcon>
                    <ContentCutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem> */}
          </MenuList>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor={'right'}
          open={userPanel}
          onClose={handleCloseuserPanel}
          onOpen={handleuserPanel}
          PaperProps={{
            elevation: 0,
            className: styles.headermobile,
            style: {
              height: '~"100vh - 100px"',
              width: '60%',
              backgroundColor: pathname.includes('/app') ? 'white' : '#2e2e47',
              color: pathname.includes('/app') ? 'black' : 'white',
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            },
          }}
        >
          <MenuList>
            <MenuItem className="cross-icon">
              <div
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 5,
                  color: 'rgba(255, 145, 153, 1)',
                }}
                onClick={handleCloseuserPanel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </MenuItem>
            {userData ? (
              <>
                <div value="/app/settings" onClick={sendto}>
                  <MenuItem
                    classes={{
                      root: 'w-[90%] mx-[5%] h-[7vh] rounded-xl fontSofiaPro font-bold text-gray-500 bg-[rgba(65,65,241,0.04)] user-profile',
                    }}
                  >
                    {' '}
                    {userData.photoURL ? (
                      <Avatar
                        alt={userData.displayName}
                        src={userData.photoURL}
                      />
                    ) : (
                      <Avatar
                        style={{
                          background:
                            'linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)',
                        }}
                      >
                        {userData.displayName?.match(/\b\w/g)?.join('') || ''}
                      </Avatar>
                    )}{' '}
                    {getTwoNames(userData.displayName)}{' '}
                  </MenuItem>
                </div>
                <div className="w-full mt-2 p-[10%]">
                  <MaterialUiCustomButtom
                    onClick={signOutFunction}
                    label="Sign Out"
                  />
                </div>
              </>
            ) : (
              <div className="w-full p-[10%]">
                <MaterialUiCustomButtom
                  value="/auth/register"
                  onClick={() => router.push('/auth/register')}
                  label="Sign Up"
                />
                <div className="my-4" />
                <MaterialUiCustomButtom
                  value="/auth/login"
                  onClick={() => router.push('/auth/login')}
                  label="Sign in"
                  background="rgba(255, 204, 208, 0.3)"
                  color="rgba(255, 145, 153, 1)"
                />
              </div>
            )}
          </MenuList>
        </SwipeableDrawer>
      </AppBar>
    </>
  )
}
export default RenderMobileMenu
