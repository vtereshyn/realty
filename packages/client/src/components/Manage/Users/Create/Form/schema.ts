import * as yup from 'yup';

export const schema = yup.object({
  email: yup.string().required('Please provide your email'),
  firstName: yup.string().required('Please provide your first name'),
  lastName: yup.string().required('Please provide your last name'),
  password: yup
    .string()
    .min(6, 'Password should contain not less than 6 characters')
    .required('Please provide your password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords should be the same')
    .required('Please confirm a password')
});

export type SignupFormType = yup.InferType<typeof schema>;
