import * as yup from 'yup'


const validationSchema = yup.object({
  email: yup.string().trim().required('Email is required.'),
})

export default validationSchema
