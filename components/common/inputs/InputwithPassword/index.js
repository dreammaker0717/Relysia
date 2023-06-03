import React from 'react'
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  makeStyles,
} from '@material-ui/core'
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}
const useStyles = makeStyles((theme) => ({
  labelFor: {
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 13,
  },
  root: {
    background: 'rgba(65, 124, 241, 0.05)',
    borderRadius: 12,
    border: '0px solid white',
    backgroundColor: 'rgba(65, 124, 241, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(65, 124, 241, 0.15)',
    },
    '&$focused': {
      backgroundColor: 'rgba(65, 124, 241, 0.15)',
      boxShadow: '0 0 10px rgba(65, 124, 241, 0.65)',
    },
    '&.Mui-focused': { backgroundColor: 'rgba(65, 124, 241, 0.15)' },
  },
  input: {
    padding: '12px 5px',
  },
  adornedStart: {
    paddingLeft: '0px',
  },
  underline: {
    // display:'none',
    '&::before': {
      display: 'none',
    },
    '&::after': {
      display: 'none',
    },
  },
}))

const InputwithPassword = (props) => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = React.useState(false)
  function showPassFunction() {
    setShowPassword(!showPassword)
  }
  const { required = false } = props
  return (
    <FormControl style={{ width: '100%' }} variant="outlined">
      <label
        className={classes.labelFor}
        htmlFor={`outlined-${props.name.replace(/\s+/g, '').toLowerCase()}`}
      >
        {capitalizeFirstLetter(props.name)}
      </label>
      <FilledInput
        fullWidth
        classes={{
          root: classes.root,
          underline: classes.underline,
          adornedStart: classes.adornedStart,
          input: classes.input,
        }} //
        inputProps={{
          fullWidth: true,
          ...(props.inputProps && { ...props.inputProps }),
        }}
        id={`outlined-${props.name.replace(/\s+/g, '').toLowerCase()}`}
        variant="filled"
        type={showPassword ? 'text' : 'password'}
        disableUnderline={true}
        value={props.value}
        onChange={props.onChange}
        required={required}
        startAdornment={
          <InputAdornment position="start">
            <img
              style={{ paddingLeft: 10 }}
              src={`https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2Fpassword.svg?alt=media`}
            />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={showPassFunction}>
              {showPassword ? (
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </IconButton>
          </InputAdornment>
        }
        //VisibilityOffIcon VisibilityIcon
      />
      {props.helperText && (
        <FormHelperText id="my-helper-text">{props.helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default InputwithPassword
