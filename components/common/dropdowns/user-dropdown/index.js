import styles from './index.module.css'
import cn from 'classnames'
import MenuItem from '@material-ui/core/MenuItem'
import { Button, makeStyles, Menu } from '@material-ui/core'
import { useState } from 'react'

const userImg = '/assets/images/user-login.svg'

const UserDropdown = ({ user, router, signOutFunction }) => {
  const { pathname } = router
  const isPathnameApp = pathname.includes('/app')
  const [anchorEl, setAnchorEl] = useState(null)
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: anchorEl && anchorEl.offsetWidth - 10,
      borderRadius: 12,
      color: isPathnameApp ? '#666f99' : 'white',
      background: isPathnameApp ? 'white' : '#64649b',
    },
  }))
  const classes = useStyles()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className="flex flex-col relative">
      <Button
        size="large"
        classes={{
          root: `flex items-center fontSofiaPro  pl-1.5  py-1.5  pr-3 rounded-xl  ${
            isPathnameApp
              ? 'bg-gray-200 text-lightSec'
              : 'text-white bg-third hover:bg-[#252538]'
          } cursor-pointer min-w-[6rem]`,
        }}
        // aria-controls="simple-menu"
        // aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          className={cn(styles.img, isPathnameApp && styles.light)}
          src={user && user?.photoUrl ? user?.photoUrl : userImg}
          alt=""
        />
        <span>
          {user && user?.displayName
            ? user?.displayName.length < 20
              ? user?.displayName
              : user?.displayName.slice(0, 19)
            : user && user?.email
            ? user?.email.slice(0, 10)
            : '-'}
        </span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // keepMounted
        classes={{ root: 'w-full' }}
        PopoverClasses={{ paper: classes.paper }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        elevation={3}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={signOutFunction}>
          <div className="text-center w-full">Sign out</div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserDropdown
