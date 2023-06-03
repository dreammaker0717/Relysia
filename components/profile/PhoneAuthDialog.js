// import React, { useState, useRef, useEffect } from 'react'
// import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
// import Slide from '@material-ui/core/Slide'
// import { ToastContainer, toast } from 'react-toastify'
// import { useRouter } from 'next/router'
// import PhoneInput from 'react-phone-number-input'
// import { updateUserDataAction } from '../../redux/actions/actiosMain'
// import { useDispatch } from 'react-redux'

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />
// })

// export default function PhoneAuthDialog(props) {
//   const [phNumberField, setphNumberField] = useState('')
//   const [isButtonDisabled, setisButtonDisabled] = useState(true)
//   const [otpField, setotpField] = useState('')
//   const [recaptchaToken, setrecaptchaToken] = useState('')
//   const [btnLoader, setbtnLoader] = useState(false)
//   const [renderRecaptcha, setrenderRecaptcha] = useState(true)

//   const containerRef = useRef(null)

//   const router = useRouter()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (props.dialogState) {
//       setisButtonDisabled(true)
//       setphNumberField('')
//       setotpField('')
//       setrecaptchaToken('')
//       if (!renderRecaptcha) {
//         setrenderRecaptcha(true)
//       }
//     }
//   }, [props.dialogState])

//   useEffect(() => {
//     if (renderRecaptcha && containerRef.current && containerRef) {
//       getRecaptcha()
//       setrenderRecaptcha(false)
//     }
//   }, [containerRef.current, renderRecaptcha])

//   const getRecaptcha = () => {
//     if (containerRef.current) {
//       containerRef.current.innerHTML = ''

//       window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//         containerRef.current,
//         {
//           size: 'normal',
//           callback: (response) => {
//             // reCAPTCHA solved, allow signInWithPhoneNumber.
//             // ...
//             setrecaptchaToken(response)
//             setisButtonDisabled(false)
//           },
//           'expired-callback': (response) => {
//             // Response expired. Ask user to solve reCAPTCHA again.
//             // ...
//             setisButtonDisabled(true)
//             toast.error('Recaptcha Exprie Please try agian', {
//               position: 'bottom-left',
//               autoClose: 10000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//             })
//           },
//         },
//       )
//       window.recaptchaVerifier.render().then(function (widgetId) {
//         window.recaptchaWidgetId = widgetId
//       })
//     }
//   }

//   const handleClose = () => {
//     props.setdialogState(false)
//   }

//   const verifyPh = async () => {
//     setbtnLoader(true)
//     if (phNumberField.length === 0) {
//       toast.error('Please enter the phone number!', {
//         position: 'bottom-left',
//         autoClose: 10000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//       setbtnLoader(false)

//       return null
//     }
//     await sendOtp()
//   }

//   const sendOtp = async () => {
//     //send otp
//     try {
//       let sendVerficationSmsAPI = firebase
//         .functions()
//         .httpsCallable('phoneNumberVerfication')
//       let sendVerficationSmsRes = await sendVerficationSmsAPI({
//         type: 'SEND-SMS',
//         phoneNumber: phNumberField,
//         recaptchaToken: recaptchaToken,
//       })
//       if (
//         sendVerficationSmsRes &&
//         sendVerficationSmsRes.data &&
//         sendVerficationSmsRes.data.status &&
//         sendVerficationSmsRes.data.status === 'success'
//       ) {
//         setbtnLoader(false)

//         toast.info('Message sended successfully', {
//           position: 'bottom-left',
//           autoClose: 10000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         })
//         props.setphoneAuthDialogView(2)
//       } else {
//         if (
//           sendVerficationSmsRes &&
//           sendVerficationSmsRes.data &&
//           sendVerficationSmsRes.data.status &&
//           sendVerficationSmsRes.data.status === 'error'
//         ) {
//           toast.error(sendVerficationSmsRes.data.msg, {
//             position: 'bottom-left',
//             autoClose: 10000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           })
//         } else {
//           toast.error('An error occured, Try again!', {
//             position: 'bottom-left',
//             autoClose: 10000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           })
//         }
//         setbtnLoader(false)
//         getRecaptcha()
//         setisButtonDisabled(true)
//       }
//     } catch (err) {
//       setbtnLoader(false)

//       toast.error('An error occured, Try again later!', {
//         position: 'bottom-left',
//         autoClose: 10000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//       getRecaptcha()
//       setisButtonDisabled(true)
//     }
//   }
//   const submitOtp = async () => {
//     setbtnLoader(true)

//     if (otpField.length === 0) {
//       toast.error('Please enter the code!', {
//         position: 'bottom-left',
//         autoClose: 10000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//       setbtnLoader(false)

//       return null
//     }

//     //verfiying the code
//     try {
//       let verifyOtpAPI = firebase
//         .functions()
//         .httpsCallable('phoneNumberVerfication')
//       let verifyOtpRes = await verifyOtpAPI({
//         type: 'VERIFY-OTP',
//         otp: otpField,
//         phoneNumber: phNumberField,
//       })
//       if (
//         verifyOtpRes &&
//         verifyOtpRes.data &&
//         verifyOtpRes.data.status &&
//         verifyOtpRes.data.status === 'success'
//       ) {
//         setbtnLoader(false)

//         toast.success('Phone number verfied successfully', {
//           position: 'bottom-left',
//           autoClose: 10000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         })
//         props.setdialogState(false)

//         let modifiedObj = { ...props.userDataRedux }
//         modifiedObj.phoneNumber = phNumberField
//         dispatch(updateUserDataAction(modifiedObj))
//       } else {
//         if (
//           verifyOtpRes &&
//           verifyOtpRes.data &&
//           verifyOtpRes.data.status &&
//           verifyOtpRes.data.status === 'error'
//         ) {
//           toast.error(verifyOtpRes.data.msg, {
//             position: 'bottom-left',
//             autoClose: 10000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           })
//         } else {
//           toast.error('An error occured, Try again!', {
//             position: 'bottom-left',
//             autoClose: 10000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           })
//         }
//         setbtnLoader(false)
//       }
//     } catch (err) {
//       setbtnLoader(false)
//       toast.error('An error occured, Try again later!', {
//         position: 'bottom-left',
//         autoClose: 10000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       })
//     }
//   }

//   const View1 = (
//     <div>
//       <div className="ph-auth-input">
//         <PhoneInput
//           placeholder="Enter phone number"
//           value={phNumberField}
//           onChange={(e) => {
//             setphNumberField(e)
//           }}
//           international={true}
//         />
//         <div className="recaptcha-div" ref={containerRef}></div>
//         <p style={{ marginTop: 20 }}>
//           By tapping Verify, an SMS will be sent. Message &amp; data rates may
//           apply.
//         </p>
//       </div>
//     </div>
//   )

//   const View2 = (
//     <div className="form-group">
//       <label>
//         Enter the 6-digit code we sent to{' '}
//         <p style={{ margin: 0, fontSize: 14, display: 'inline-block' }}>
//           {phNumberField}
//         </p>
//       </label>
//       <input
//         onChange={(e) => {
//           setotpField(e.target.value)
//         }}
//         type="number"
//         className="form-control"
//         value={otpField}
//         placeholder="code"
//       />
//       <p
//         className="link"
//         style={{
//           fontSize: 12,
//           marginTop: 10,
//           display: 'inline-block',
//           marginBottom: 0,
//         }}
//         onClick={() => {
//           props.setphoneAuthDialogView(1)
//           // getRecaptcha();
//           setisButtonDisabled(true)
//           setrenderRecaptcha(true)
//         }}
//       >
//         Change contact number
//       </p>
//     </div>
//   )

//   return (
//     <Dialog
//       open={props.dialogState}
//       TransitionComponent={Transition}
//       keepMounted
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-slide-title"
//       aria-describedby="alert-dialog-slide-description"
//       fullWidth
//       style={{ zIndex: 1000 }}
//       maxWidth="sm"
//     >
//       <h5 style={{ padding: '18px 24px 5px 24px' }}>
//         {props.phoneAuthDialogView === 1
//           ? `${props.updateNumber ? 'Update' : 'Add'} Your Contact Number`
//           : 'Verify Your Contact Number'}
//       </h5>

//       <DialogContent>
//         {props.phoneAuthDialogView === 1 ? View1 : View2}
//       </DialogContent>
//       <DialogActions style={{ marginTop: 10, height: 50 }}>
//         {props.phoneAuthDialogView === 1 ? (
//           <>
//             {btnLoader ? (
//               <div style={{ width: 80 }}>
//                 {/* <CustomLoader width={25} height={25} /> */}
//               </div>
//             ) : (
//               <button
//                 className={
//                   isButtonDisabled
//                     ? 'btn btn-primary btn-small disabled-btn'
//                     : 'btn btn-primary btn-small'
//                 }
//                 onClick={verifyPh}
//                 disabled={isButtonDisabled}
//               >
//                 Verify
//               </button>
//             )}
//           </>
//         ) : (
//           <>
//             {btnLoader ? (
//               <div style={{ width: 80 }}>
//                 {/* <CustomLoader width={25} height={25} /> */}
//               </div>
//             ) : (
//               <button
//                 className={'btn btn-primary btn-small'}
//                 onClick={submitOtp}
//               >
//                 Submit
//               </button>
//             )}
//           </>
//         )}
//       </DialogActions>

//       <ToastContainer />
//     </Dialog>
//   )
// }
