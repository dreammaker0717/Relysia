const AppDetailsValidator = ({
  appName,
  email,
  shortDescription,
  longDescription,
}) => {
  const error = {}

  if (!appName) {
    error.name = '* Field is required'
    error.error = true
  } else {
    error.name = ''
    error.error = error.error
  }

  if (!email) {
    error.email = '* Field is required'
    error.error = true
  } else if (email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(email) == false) {
      error.email = 'Please enter a valid email address'
      error.error = true
    }
  } else {
    error.email = ''
    error.error = error.error
  }

  if (!shortDescription) {
    error.shortDescription = 'Field is required'
    error.error = true
  } else if (shortDescription && shortDescription.length > 50) {
    error.shortDescription =
      'Short description should be less than 50 characters'
    error.error = true
  } else {
    error.shortDescription = ''
    error.error = error.error
  }

  if (!longDescription) {
    error.longDescription = 'Field is required'
    error.error = true
  } else if (longDescription && longDescription.length > 500) {
    error.longDescription = 'Long description should be less than 500 character'
    error.error = true
  } else {
    error.longDescription = ''
    error.error = error.error
  }

  return error
}

export default AppDetailsValidator
