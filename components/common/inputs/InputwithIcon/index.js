import { useEffect, useState } from 'react'
import styles from './index.module.css'

import {
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  makeStyles,
} from '@material-ui/core'
import { ColorToFilter } from '../../ColorFilter'
import { toast } from 'react-toastify'
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}
let colorData = {
  blue: 'invert(30%) sepia(71%) saturate(3049%) hue-rotate(202deg) brightness(99%) contrast(109%)',
  red: 'invert(25%) sepia(73%) saturate(4457%) hue-rotate(343deg) brightness(118%) contrast(99%)',
  white:
    'invert(82%) sepia(98%) saturate(10%) hue-rotate(164deg) brightness(104%) contrast(103%)',
  unSet: 'unset',
}

const InputwithIcon = (props) => {
  const useStyles = makeStyles((theme) => ({
    labelFor: {
      marginBottom: 2,
      marginLeft: 4,
      fontSize: 13,
    },
    root: {
      color: 'inherit',
      background: 'rgba(65, 124, 241, 0.05)',
      borderRadius: 12,
      border: '0px solid white',
      backgroundColor: 'rgba(65, 124, 241, 0.05)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        borderRadius: 12,
        backgroundColor: 'rgba(65, 124, 241, 0.15)',
      },
    },
    rootFocused: {
      borderRadius: 12,
      backgroundColor: 'rgba(65, 124, 241, 0.15)',
      boxShadow: '0 0 10px rgba(65, 124, 241, 0.05)',
    },
    error: {
      // backgroundColor: 'radial-gradient(circle, rgba(234,0,0,0.37272408963585435) 0%, rgba(141,192,255,0) 100%)'
    },
    multiline: {
      padding: '0',
      paddingInline: 5,
    },
    input: {
      paddingLeft: props.iconState ? '' : '10px',
      padding: '12px 5px',

      '&:invalid': {
        '&:focus': {
          background:
            'radial-gradient(circle, rgba(35, 0, 235, 0.16) 0%, rgba(0,0,0,0) 100%)',
          color: 'red',
        },
      },
    },
    adornedStart: {
      paddingLeft: '0px',
    },
  }))
  let cssFilterValue = colorData.red
  if (props.iconColor) {
    if (colorData[`${props.iconColor}`]) {
      cssFilterValue = colorData[`${props.iconColor}`]
    } else {
      const cssFilter = ColorToFilter(props.iconColor)
      // console.log(cssFilter)
      cssFilterValue = cssFilter
    }
  }

  const classes = useStyles()
  const { pattern } = props
  function invalidddd() {
    toast.warn('Please make sure all fields are valid', {
      toastId: 'inPutwithIconError',
      autoClose: 2000
    })
  }
  return (
    <FormControl
      style={{ width: '100%', color: props.textColor && props.textColor }}
      variant="outlined"
    >
      {!props.hideLabel && (
        <label
          style={{ color: props.textColor && props.textColor }}
          className={classes.labelFor}
          htmlFor={`outlined-${props.name.replace(/\s+/g, '').toLowerCase()}`}
        >
          {capitalizeFirstLetter(props.name)}
        </label>
      )}

      <FilledInput
        required={props.required}
        fullWidth
        // style={{ color: props.textColor && props.textColor}}
        placeholder={props.placeholder && capitalizeFirstLetter(props.placeholder)}
        multiline={props.multiline}
        classes={{
          root: classes.root,
          focused: classes.rootFocused,
          adornedStart: 'pl-0',
          input: classes.input,
          multiline: classes.multiline,
          error: classes.error,
        }}
        inputProps={{
          fullWidth: true,
          onInvalid: invalidddd,
          ...(props.inputProps && { ...props.inputProps }),
          pattern
        }}
        id={`outlined-${props.name.replace(/\s+/g, '').toLowerCase()}`}
        variant="filled"
        type={props.type}
        defaultValue={props.defaultValue}
        disableUnderline={true}
        value={props.value}
        onChange={props.onChange}
        // inputProps={{pattern}}
        endAdornment={
          props.endEndorment && (
            <>
              <InputAdornment position="end">
                {props.endEndorment}
              </InputAdornment>
            </>
          )
        }
        startAdornment={
          props.iconState && (
            <InputAdornment position="start">
              {/* <IconButton edge="end"> */}

              <img
                className="transition-all"
                style={{ paddingLeft: 10, filter: cssFilterValue }}
                src={`/images/inputIcons/${props.iconState}.svg`}
              />

              {/* </IconButton> */}
            </InputAdornment>
          )
        }
      />
      {props.helperText && (
        <FormHelperText id="my-helper-text">{props.helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default InputwithIcon
