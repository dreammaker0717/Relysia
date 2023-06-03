import { useState } from 'react'
import { toast } from 'react-toastify'
import { firebaseAuthFunc } from '@/config/init'
import LoginRegister from '../login-register'
import styles from './index.module.css'
import Title from '../common/title'
import Loader from '../loader'
import InputwithIcon from '../common/inputs/InputwithIcon'
import Button from '../common/button'
import CustomInput from '../common/inputs/custom-input'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'

const mailIcon = '/assets/images/mail-icon.svg'

const ForgetContent = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const { errors } = formState
  const [Loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleError(error) {
    setLoading(false)
    switch (error.code) {
      case 'auth/invalid-email':
        toast.error('Please Enter Valid Email.', { toastId: 'validEmailError' })
        break
      case 'auth/user-not-found':
        toast.error('There is no such email address.')
        break
      default:
        console.log(error)
        toast.error('Error')
        break
    }
  }
  const onUserLogin = async (data) => {
    const { email } = data
    // e.preventDefault()
    setLoading(true)
    await sendPasswordResetEmail(firebaseAuthFunc, email, {
      url: `${window.location.origin}/auth/forget?email=${email}`,
    })
      .then(() => {
        toast.success('Check your Email .')
        setSuccess(true)
        setLoading(false)
      })
      .catch(handleError)
  }

  return (
    <LoginRegister>
      {!Loading ? (
        !success ? (
          <div className={styles.wrapper}>
            <div className={styles.texts}>
              <Title heading="h3">Reset Password</Title>
              <p className={styles.p}>
                Enter the email associated with your account and we'll send an
                email with instructions to reset your password.
              </p>
            </div>

            <div className="w-full mb-5">
              <form onSubmit={handleSubmit(onUserLogin)}>
                <div className="flex flex-col input-field">
                  <Controller
                    name={'email'}
                    control={control}
                    render={({ field }) => {
                      return (
                        <CustomInput
                          icon={mailIcon}
                          forId={'email'}
                          customStyle="mb-6"
                          placeholder="Please enter email"
                          inputType={'email'}
                          required
                          {...field}
                        />
                      )
                    }}
                  />
                  <span className=" text-red-600 my-1">
                    {errors['email']?.message}
                  </span>
                </div>

                <Button className="py-4" appearance="primary" flat>
                  Reset Password
                </Button>
              </form>{' '}
            </div>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <img src="/images/forget/checkEmail.svg" className="w-[40%] my-6" />
            <div className={styles.texts}>
              <Title heading="h3">Check your email</Title>
              <p className={styles.p}>
                We have sent recovery instructions to your email{' '}
              </p>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </LoginRegister>
  )
}

export default ForgetContent
