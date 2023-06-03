import React, { useState, useEffect } from 'react'
import Fetch from '../../utils/fireAjax'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import './index.module.css'
import validator from './validation'
import { toast, ToastContainer } from 'react-toastify'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Box from '@material-ui/core/Box'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import ToggleSwitch from '../Toggle-switch'
import AppDetailsValidator from './AppDetails-validation'
import UrlValidator from './url-validations'
import Router from 'next/router'

const AdddetailsSet = '/static/images/dashboard/dasboardSucess.svg'
const AdddetailsUnset = '/static/images/dashboard/Frame2.svg'
const Completed = '/static/images/dashboard/completeIcon.svg'
const PermissionUnset = '/static/images/dashboard/permissionUnset.svg'
const UrlSet = '/static/images/dashboard/urlsucess.svg'
const PermissionSet = '/static/images/dashboard/permissionSet.svg'
const ProfileImg = '/static/images/permission-images/image6.svg'
const PrivateImg = '/static/images/permission-images/image5.svg'
const PayImg = '/static/images/permission-images/image4.svg'
const EncryptImg = '/static/images/permission-images/image3.svg'
const SignImg = '/static/images/permission-images/image2.svg'
const FriendImg = '/static/images/permission-images/image1.svg'
const permission = [
  'PUBLIC_PROFILE',
  'PRIVATE_PROFILE',
  'PAY',
  'ENCRYPT',
  'SIGN_DATA',
  'FRIENDS_LIST',
]

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    labelIcon: {
      '& svg': {
        fontSize: '3.5rem',
      },
    },
    boxCont: {
      '& .MuiStepConnector-vertical': {
        marginLeft: '2vw',
        flex: 0,
        '& .MuiStepConnector-lineVertical': {
          minHeight: '20vh',
          borderLeft: '3px solid rgba(76, 73, 109, 0.08);',
        },
      },
    },
  }),
)

function getSteps() {
  return [
    <b style={{ color: '#0075FF' }}>
      Step 1 of 3<p>App Details</p>
    </b>,
    <b style={{ color: '#0075FF' }}>
      Step 2 of 3<p>Redirection Urls</p>
    </b>,
    <b style={{ color: '#0075FF' }}>
      Step 3 of 3<p>App permission</p>
    </b>,
  ]
}

const DashboardForm = ({ selectedApp }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const [state, setState] = useState({
    clientSecret: '',
    clientKey: '',
    appName: '',
    email: '',
    shortDescription: '',
    longDescription: '',
    urlSuccessRedirect: '',
    urlDeclineRedirect: '',
  })

  const [features, setFeatures] = useState([permission[0]])

  const [formError, setFormError] = useState({})
  const [step1, setStep1] = useState(false)
  const [step2, setStep2] = useState(false)

  let {
    clientSecret,
    clientKey,
    appName,
    email,
    shortDescription,
    longDescription,
    urlSuccessRedirect,
    urlDeclineRedirect,
  } = state

  useEffect(() => {
    const {
      clientSecret,
      id,
      name,
      email,
      shortDescription,
      longDescription,
      successRedirectURL,
      errorRedirectURL,
      permissions,
    } = selectedApp
    setState({
      clientSecret: clientSecret || '',
      clientKey: id || '',
      appName: name || '',
      email: email || '',
      shortDescription: shortDescription || '',
      longDescription: longDescription || '',
      urlSuccessRedirect: successRedirectURL || '',
      urlDeclineRedirect: errorRedirectURL || '',
    })
    // console.log(permissions, 'permissionspermissions')
    setFeatures(permissions || [])
  }, [selectedApp])
  // console.log(clientSecret)
  // console.log(state, 'yyyyyyyyyyy')
  const copyToClip = (val) => {
    navigator.clipboard.writeText(val).then(
      function () {
        toast.success('Successfully Copied', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // toastId: 'success-copy',
        })
        // alert('copied')
      },
      function (err) {
        // toast.error('Could not copy text', { toastId: 'error-copy' })
        toast.error('Could not Copied', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // toastId: 'success-copy',
        })
      },
    )
  }

  const generateUuid = async () => {
    const arrItem = features.map((item) => item.name)
    const data = {
      name: appName,
      email: email,
      successRedirectURL: urlSuccessRedirect,
      errorRedirectURL: urlDeclineRedirect,
      authToken: localStorage.getItem('auth__token'),
      permissions: features,
      shortDescription: shortDescription,
      longDescription: longDescription,
    }
    try {
      let res
      if (state.clientKey && state.clientSecret) {
        res = await Fetch.patch(
          `https://api.relysia.com/oauth/client/${state.clientKey}`,
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            authToken: localStorage.getItem('auth__token'),
          },
          data,
        )
      } else {
        res = await Fetch.post(
          'oauth/register',
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            authToken: localStorage.getItem('auth__token'),
          },
          data,
        )
      }
      const {
        data: {
          msg: { clientKey, clientSecret },
        },
      } = res

      if (clientKey && clientSecret)
        setState({ ...state, clientKey, clientSecret })
      else {
        setState({ ...state })
      }
      toast.success('Successfully Submitted', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'submit-toast',
      })
    } catch (e) {
      console.log(e.toString())
      toast.error('Something went wrong please try again', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'error1-toast',
      })
    }
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSelect = (feature) => {
    console.log('features1', features)
    const sameItem = features.find((item) => item === feature)

    console.log('sameItem', sameItem)

    let newFeatures

    if (sameItem) {
      const filteredArray = features.filter((item) => item != feature)
      console.log('filteredArray', filteredArray)
      newFeatures = [...filteredArray]
      console.log('features3', features)
    } else {
      newFeatures = [...features, feature]
      console.log('newFeatures', newFeatures)
    }

    setFeatures([...newFeatures])
  }
  console.log('features4', features)

  const handleClick = () => {
    const error = validator(state)

    setFormError(error)
    console.log(error)
    if (!error.error) {
      generateUuid()
      setFormError({})
      window.scroll(0, 0)
      Router.push(`/app/connect`)
    } else {
      toast.error('Please fill all the required fields', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'error-toast',
      })
      window.scroll(0, 0)
    }
  }

  //app details validator
  const handleAppDetails = () => {
    const error = AppDetailsValidator(state)
    setFormError(error)
    if (!error.error) {
      setFormError({})
      window.scroll(0, 0)
      handleNext()
      setStep1(true)
    } else {
      toast.error('Please fill all the required fields', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'error-toast',
      })
      window.scroll(0, 0)
    }
  }

  //redirection url validator functions
  const handleUrls = () => {
    const error = UrlValidator(state)
    setFormError(error)
    if (!error.error) {
      setFormError({})
      window.scroll(0, 0)
      handleNext()
      setStep2(true)
    } else {
      toast.error('Please fill all the required fields', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'error-toast',
      })
      window.scroll(0, 0)
    }
  }

  function getIcon(index, activeIndex) {
    if (index < activeIndex) {
      return <>{<img src={Completed} />}</>
    }
    if (index > activeIndex) {
      if (index === 1) {
        return <>{<img src={AdddetailsUnset} />}</>
      }
      if (index == 2) {
        return <>{<img src={PermissionUnset} />}</>
      }
    }
    if (index === activeIndex) {
      if (activeIndex === 0) {
        return <>{<img src={AdddetailsSet} />}</>
      }
      if (activeIndex === 1) {
        return <>{<img src={UrlSet} />}</> //active second step icon
      }
      if (activeIndex === 2) {
        return <>{<img src={PermissionSet} />}</> //active third step icon
      }
    }
  }

  return (
    <>
      <div className="container landing_screen mt-6">
        <h5 className="mb-3 text-2xl ml-4">Connect App</h5>
        <Box
          sx={{ width: '100%', display: 'flex' }}
          className={classes.boxCont}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              const stepProps = {}
              const labelProps = {}

              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    icon={getIcon(index, activeStep)}
                    className={classes.labelIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === 0 ? (
            <div className=" bg-white shadow-md form-BorderRadius px-8 pt-6 pb-8 mb-4 my-2 w-75">
              <h5 className="mb-6 text-2xl uppercase"></h5>
              <div className="-mx-3 md:flex mb-6">
                {clientSecret ? (
                  <div className="md:w-2/6 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2">
                      Secret Id
                    </label>
                    {/* <div className="u_details"> */}
                    <input
                      style={{ position: 'relative' }}
                      value={clientSecret}
                      className="text-input w-80 bg-dashboardFormInputBg text-grey-darker border border-red form-BorderRadius py-3 px-4 mb-3 mr-3"
                      disabled
                    />
                    <span
                      onClick={() => copyToClip(clientSecret)}
                      style={{
                        position: 'absolute',
                        marginLeft: '-42px',
                        marginTop: '12px',
                        textAlign: 'center',
                      }}
                      className="text-2xl cursor-pointer hover:text-blue-500"
                    >
                      <ClipboardDocumentIcon className='w-5 h-5' />
                    </span>
                  </div>
                ) : (
                  ''
                )}
                <div className="md:w-2/6 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2"
                    htmlFor="app-name"
                  >
                    APP NAME
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker placeholder-dashboardFormInput border border-red form-BorderRadius py-3 px-4 mb-3"
                    id="app-name"
                    type="text"
                    placeholder="App Name"
                    name="appName"
                    value={appName}
                    onChange={handleChange}
                  />
                  {formError && formError.name && (
                    <span className="text-red-700 block">{formError.name}</span>
                  )}
                </div>
                <div className="md:w-2/6 px-3">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2"
                    htmlFor="email-pubisher"
                  >
                    EMAIL PUBLISHER
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker placeholder-dashboardFormInput border border-grey-lighter form-BorderRadius py-3 px-4"
                    id="email-pubisher"
                    type="email"
                    value={email}
                    placeholder="Email Publisher"
                    name="email"
                    onChange={handleChange}
                  />
                  {formError && formError.email && (
                    <span className="text-red-700 block">
                      {formError.email}
                    </span>
                  )}
                </div>
              </div>
              {clientKey ? (
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2">
                      Secret Key
                    </label>
                    {/* <div className="u_details"> */}
                    <input
                      style={{ position: 'relative' }}
                      value={clientKey}
                      className="text-input w-80 bg-dashboardFormInputBg text-grey-darker border border-red form-BorderRadius py-3 px-4 mb-3 mr-3"
                      disabled
                    />
                    {/* <button
                 onClick={() => copyToClip(clientKey)}
                 className="submitBtn  btn-primary"
               >
                 Copy
               </button> */}
                    <span
                      onClick={() => copyToClip(clientKey)}
                      style={{
                        position: 'absolute',
                        marginLeft: '-42px',
                        marginTop: '12px',
                        textAlign: 'center',
                      }}
                      className="text-2xl cursor-pointer hover:text-blue-500"
                    >
                      <FaRegCopy />
                    </span>
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="-mx-3 md:flex mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel placeholder-dashboardFormInput text-sm font-bold mb-2"
                    htmlFor="app-short-description"
                  >
                    SHORT DESCRIPTION
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker border border-grey-lighter form-BorderRadius py-3 px-4"
                    id="app-short-description"
                    type="text"
                    placeholder="Short Description"
                    maxLength={50}
                    name="shortDescription"
                    onChange={handleChange}
                    value={shortDescription}
                  />
                  {formError && formError.shortDescription && (
                    <span className="text-red-700 block">
                      {formError.shortDescription}
                    </span>
                  )}
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2"
                    htmlFor="app-long-description"
                  >
                    LONG DESCRIPTION
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker border border-grey-lighter form-BorderRadius py-3 px-4"
                    id="app-long-description"
                    type="text"
                    placeholder="Long Description"
                    maxLength={500}
                    name="longDescription"
                    onChange={handleChange}
                    value={longDescription}
                  />
                  {formError && formError.longDescription && (
                    <span className="text-red-700 block">
                      {formError.longDescription}
                    </span>
                  )}
                </div>
              </div>
              <div className=" mb-8">
                <button
                  className="submitBtn  form-BorderRadius w-100"
                  onClick={handleAppDetails}
                >
                  Next
                </button>
              </div>
            </div>
          ) : activeStep === 1 ? (
            <div className=" bg-white shadow-md form-BorderRadius px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-75">
              <h5 className="mb-6 text-2xl uppercase"></h5>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2"
                    htmlFor="url-success-redirect"
                  >
                    AUTHORIZE ORIGIN URL
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker placeholder-dashboardFormInput border border-red form-BorderRadius py-3 px-4 mb-3"
                    id="url-success-redirect"
                    type="text"
                    placeholder="https://..."
                    name="urlSuccessRedirect"
                    onChange={handleChange}
                    value={urlSuccessRedirect}
                  />
                  {formError && formError.urlSuccessRedirect && (
                    <span className="text-red-700 block">
                      {formError.urlSuccessRedirect}
                    </span>
                  )}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-dashboardFormInputLabel text-sm font-bold mb-2"
                    htmlFor="url-decline-redirect"
                  >
                    URL DECLINE REDIRECT
                  </label>
                  <input
                    className="appearance-none block w-full bg-dashboardFormInputBg text-grey-darker placeholder-dashboardFormInput border border-grey-lighter form-BorderRadius py-3 px-4"
                    id="url-decline-redirect"
                    type="text"
                    placeholder="https://..."
                    name="urlDeclineRedirect"
                    onChange={handleChange}
                    value={urlDeclineRedirect}
                  />
                  {formError && formError.urlDeclineRedirect && (
                    <span className="text-red-700 block">
                      {formError.urlDeclineRedirect}
                    </span>
                  )}
                </div>
              </div>
              <div className=" mb-8">
                <button
                  className="submitBtn  form-BorderRadius w-100"
                  onClick={handleUrls}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md form-BorderRadius px-8 pt-6 pb-8 my-4 flex flex-col my-2 w-75">
              <h5 className="mb-6 text-2xl uppercase"></h5>
              <div className="-mx-3 row justify-content-between mb-6">
                <div
                  onClick={() => handleSelect(permission[0])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-between mb-6">
                    <div className="col-auto text-4xl text-gray-400">
                      <img src={ProfileImg} />
                    </div>
                    <div className="col dash-card-body">
                      <h6 className="mb-2">User Public Profile</h6>
                      <p className="mb-0 permissionDesc">
                        Get user's handle, display name and profile picture.
                      </p>
                    </div>
                    <div className="col-auto text-3xl">
                      {features.find((item) => item == permission[0]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleSelect(permission[1])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-between mb-6">
                    <div className="col-auto">
                      <img src={PrivateImg} />
                    </div>
                    <div className="col">
                      <h6 className="mb-2">Private Profile</h6>
                      <p className="mb-0 permissionDesc">
                        Get user's email address and phone number.
                      </p>
                    </div>
                    <div className="col-auto text-3xl">
                      {features.find((item) => item == permission[1]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleSelect(permission[2])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-between mb-6">
                    <div className="col-auto">
                      <img src={PayImg} />
                    </div>
                    <div className="col">
                      <h6 className="mb-2">Pay</h6>
                      <p className="mb-0 permissionDesc text-gray-darker">
                        Trigger payments from user@apos;s wallet within allowed
                        limit.
                      </p>
                    </div>
                    <div className=" col-auto text-3xl">
                      {features.find((item) => item == permission[2]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleSelect(permission[3])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-between mb-6">
                    <div className="col-auto">
                      <img src={EncryptImg} />
                    </div>
                    <div className="col">
                      <h6 className="mb-2">Encrypt</h6>
                      <p className="mb-0 permissionDesc text-gray-darker">
                        Encrypt and decrypt with user keys.
                      </p>
                    </div>
                    <div className="col-auto text-3xl">
                      {features.find((item) => item == permission[3]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleSelect(permission[4])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-between mb-6">
                    <div className="col-auto">
                      <img src={SignImg} />
                    </div>
                    <div className="col">
                      <h6 className="mb-2">Sign Data</h6>
                      <p className="mb-0 permissionDesc text-gray-darker">
                        Sign data with your identity.
                      </p>
                    </div>
                    <div className="col-auto text-3xl">
                      {features.find((item) => item == permission[4]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleSelect(permission[5])}
                  className="col-6 my-3 px-3 py-3 shadow-md form-BorderRadius permissionCard hover:shadow-xl cursor-pointer"
                >
                  <div className="row align-items-center justify-content-between mb-6">
                    <div className="col-auto">
                      <img src={FriendImg} />
                    </div>
                    <div className="col">
                      <h6 className="mb-2">Friend List</h6>
                      <p className="mb-0 permissionDesc text-gray-darker">
                        Get a list of user's HandCash friends.
                      </p>
                    </div>
                    <div className=" col-auto text-3xl">
                      {features.find((item) => item == permission[5]) ? (
                        <ToggleSwitch checked={true} />
                      ) : (
                        <ToggleSwitch checked={false} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="submitBtn   form-BorderRadius w-100"
                onClick={handleClick}
              >
                Finish Setting Up
              </button>
            </div>
          )}
        </Box>
        <ToastContainer />
      </div>
      <style jsx>
        {`
          .form-BorderRadius {
            border-radius: 1.25rem !important;
          }
          .permissionCard {
            max-width: 49% !important;
            background: rgba(65, 124, 241, 0.05);
          }
          .submitBtn {
            border: none;
            background: #0075ff;
            border-radius: 16px;
            padding: 15px 40px;
            position: relative;
            border-radius: 4px;
            z-index: 1;
            text-transform: uppercase;
            transition: 0.5s;
            font-weight: 600;
            font-size: 14px;
            color: white;
          }
          .permissionDesc {
            color: #666f99 !important;
            line-height: 1.3rem;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}

export default DashboardForm
