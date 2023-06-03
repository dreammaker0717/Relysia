import { isValidElement } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
let colorData = {
  blue: 'invert(30%) sepia(71%) saturate(3049%) hue-rotate(202deg) brightness(99%) contrast(109%)',
  red: 'invert(25%) sepia(73%) saturate(4457%) hue-rotate(343deg) brightness(118%) contrast(99%)',
  white:
    'invert(82%) sepia(98%) saturate(10%) hue-rotate(164deg) brightness(104%) contrast(103%)',
  unSet: 'unset',
}

const MaterialUiCustomButtom = ({ label, loading, borderRadius, ...props }) => {
  const useStyles = makeStyles((theme) => ({
    outlined: {
      background: 'red',
    },
    root: {
      paddingBlock: 9,
      position: 'relative',
      borderRadius: borderRadius || 12,
      marginRight: props.marginRight,
      height: props.height,
      color: props.color ? props.color : 'white',
      transition: 'all .15s ease-in-out',
      '&.MuiButton-contained': {
        background: props.disabled
          ? '#c9ced7'
          : props.background
          ? props.background
          : 'linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)',

        '&:hover': {
          // background:
          //   'linear-gradient(111.07deg, #CE0047 10.57%, #ED8000 105.27%)',
          filter: 'brightness(90%) contrast(110%) hue-rotate(10deg)',
        },
      },
    },
  }))
  const classes = useStyles()
  let cssFilterValue = colorData.unSet
  if (props.iconColor) {
    if (colorData[`${props.iconColor}`]) {
      cssFilterValue = colorData[`${props.iconColor}`]
    } else {
      const cssFilter = ColorToFilter(props.iconColor)
      // console.log(cssFilter)
      cssFilterValue = cssFilter
    }
  }

  return (
    <Button
      value={props.value}
      type={props.type}
      disabled={props.disabled}
      fullWidth={!props.disablefullWidth}
      classes={{ outlined: classes.outlined, root: classes.root }}
      variant="contained"
      onClick={props.onClick}
      style={props.style}
    >
      {props.leftIcon && (
        <div className="absolute left-1 top-0 h-[100%] flex items-center">
          <div>{props.leftIcon}</div>
        </div>
      )}
      {props.rightIcon && (
        <div className="absolute right-1 top-0 h-[100%] flex items-center">
          <div>{props.rightIcon}</div>
        </div>
      )}
      {label}{' '}
      <CircularProgress
        aria-label='progress-bar'
        color="white"
        className={`${styles.loadingButtom} ${loading && styles.active}`}
      />{' '}
      {props.iconState && (
        <>
          {isValidElement(props.iconState) ? (
            props.iconState
          ) : (
            <img
              className={`${styles.loadingButtom} ${!loading && styles.active}`}
              style={{ filter: cssFilterValue }}
              src={`/images/inputIcons/${props.iconState}.svg`}
            />
          )}
        </>
      )}
    </Button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  appearance: PropTypes.string.isRequired,
  arrow: PropTypes.string,
  href: PropTypes.string,
  fill: PropTypes.string,
  small: PropTypes.bool,
  flat: PropTypes.bool,
  loading: PropTypes.bool,
}

export default MaterialUiCustomButtom
