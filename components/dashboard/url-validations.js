const UrlValidator = ({ urlSuccessRedirect, urlDeclineRedirect }) => {
  const error = {}

  if (!urlSuccessRedirect) {
    error.urlSuccessRedirect = 'Success URL is required'
    error.error = true
  } else {
    error.urlSuccessRedirect = ''
    error.error = error.error
  }

  if (!urlDeclineRedirect) {
    error.urlDeclineRedirect = 'Decline URL is required'
    error.error = true
  } else {
    error.urlDeclineRedirect = ''
    error.error = error.error
  }

  return error
}

export default UrlValidator
