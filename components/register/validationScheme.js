import * as yup from 'yup'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const nameRegex = /^[a-zA-Z\s]*$/

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(nameRegex, 'Please enter only letters.')
    .required('Name is required.')
    .min(4, 'Name must be at least 4 characters long.'),
  email: yup.string().trim().required('Email is required.'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
})

export default validationSchema
