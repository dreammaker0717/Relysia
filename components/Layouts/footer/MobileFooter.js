import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  SwipeableDrawer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
  bottomnavigation: {
    background: 'white',
    backgroundImage:
      'url(/images/footer/bottomBar.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 94%',
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
    height: '100px',
  },
  appBar: {
    fontWeight: '400',
    top: 'auto',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    bottom: 0,
    boxShadow: '0px -10px 80px rgba(51, 136, 255, 0.2)',
    background: 'rgba(0, 0, 0, 0.001)',

    zIndex: 15000,
  },
}))
const MobileFooter = ({ pathname,router }) => {
  const footerMobile = [
    {
      name: 'Wallet',
      url: '/app/wallet',
    },
    { name: 'NFT', url: '/app/nft' },
    { name: 'Settings', url: '/app/settings' },
    { name: 'Mint', url: '/app/mint' },
    { name: 'More', url: '' },
    { name: 'Manage', url: '/app/manage' },
    { name: 'Friends', url: '' },
    { name: 'Zapier', url: '/app/zaps' },
    { name: 'Infrastructure', url: '' },
  ]
  const classes = useStyles()
  const [drawerMore, setdrawerMore] = React.useState(false)
  const path = pathname.split('/').slice(1, 3).join('/')
  const indexofpath = footerMobile.findIndex(
    (a) => a.url && a.url.includes(path),
  )
  function getIndexfromPath(index) {
    if (index > -0.5 && index < 4.5) {
      return index
    } else {
      return 4
    }
  }
  const [value, setValue] = React.useState(-1)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    if (!open && value === 4) {
      return
    }
    setdrawerMore(open)
  }

  const changeBottomFunc = (event, newValue) => {
    // console.log('newValue')
    // console.log(newValue)
    if (newValue !== 4 && drawerMore) {
      setdrawerMore(false)
    }
    if (newValue !== 4) {
      if (footerMobile[newValue].url) {
        router.push(footerMobile[newValue].url)
      }

      // setValue(newValue);
    }
    if (newValue === 4 && !drawerMore) {
      setdrawerMore(true)
    }
    if (newValue === 4 && drawerMore) {
      setdrawerMore(false)
    }
  }

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <div style={{ width: '100%', height: 100, position: 'relative' }}>
          <BottomNavigation
            className={classes.bottomnavigation}
            showLabels
            value={getIndexfromPath(indexofpath)}
            onChange={changeBottomFunc}
          >
            {footerMobile.slice(0, 5).map((element, index) => (
              <BottomNavigationAction
                className="fontSofiaPro"
                label={element.name}
                icon={
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <img
                      alt={element.name.toLowerCase()}
                      style={{
                        opacity:
                          getIndexfromPath(indexofpath) === index ||
                          (index === 4 && drawerMore)
                            ? 0
                            : 1,
                        position: 'absolute',
                        filter:
                          getIndexfromPath(indexofpath) === index ||
                          (index === 4 && drawerMore)
                            ? 'blur(0.15rem)'
                            : '',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'all .2s ease-in-out',
                      }}
                      // src={`https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/bottom_bar%2F${element.name.toLowerCase()}.svg?alt=media`}
                      src={
                        '/images/footer/' + element.name.toLowerCase() + '.svg'
                      }
                    />
                    <img
                      alt={element.name.toLowerCase()}
                      style={{
                        opacity:
                          getIndexfromPath(indexofpath) === index ||
                          (index === 4 && drawerMore)
                            ? 1
                            : 0,
                        position: 'absolute',
                        filter:
                          getIndexfromPath(indexofpath) === index ||
                          (index === 4 && drawerMore)
                            ? ''
                            : 'blur(0.15rem)',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        transition: 'all .2s ease-in-out',
                      }}
                      // src={`https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/bottom_bar%2F${element.name.toLowerCase()}${'-active'}.svg?alt=media`}
                      src={
                        '/images/footer/' +
                        element.name.toLowerCase() +
                        '-active.svg'
                      }
                    />
                  </div>
                }
              />
            ))}
          </BottomNavigation>
          <div
            style={{
              height: 7,
              width: '26%',
              position: 'absolute',
              bottom: '10px',
              right: '0px',
              zIndex: '6000',
            }}
          ></div>
        </div>
      </AppBar>
      <SwipeableDrawer
        className="fontSofiaPro"
        anchor={'bottom'}
        open={drawerMore}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          elevation: 0,
          style: { width: '100%', backgroundColor: 'transparent' },
        }}
      >
        <div
          style={{
            height: '50vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'white',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            paddingBlock: 28,
            paddingInline: 16,
          }}
        >
          <div
            style={{
              width: '26.66666%',
              height: 8,
              marginBottom: '1.7%',
              background: 'rgba(51, 136, 255, 1)',
              borderRadius: 8,
            }}
          >
            {' '}
          </div>
          {footerMobile.slice(5, 9).map((element, index) => (
            <div
              onClick={() => {
                if (element.url && element.url !== '') {
                  setdrawerMore(false)
                  router.push(element.url)
                }
              }}
              style={{
                height: '10%',
                width: '91.46%',
                marginBlock: '1.955%',
                paddingInline: '2.3323%',
                background: 'rgba(216, 235, 253, 0.4)',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  marginRight: '4.6647%',
                  width: 'calc(50vh*6/100)',
                  transition: 'all .2s ease-in-out',
                }}
                //     src={`https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/bottom_bar%2F${element.name.toLowerCase()}.svg?alt=media`}
                src={'/images/footer/' + element.name.toLowerCase() + '.svg'}
              />
              <div style={{ fontWeight: 'normal' }}> {element.name}</div>
            </div>
          ))}
        </div>
      </SwipeableDrawer>
    </>
  )
}
export default MobileFooter
