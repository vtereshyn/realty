import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Please provide valid email')
    .required('Please provide your email'),
  password: yup.string().required('Please provide your password')
});

export type LoginFormType = yup.InferType<typeof schema>;
