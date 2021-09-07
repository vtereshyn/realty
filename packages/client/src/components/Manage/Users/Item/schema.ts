import * as yup from 'yup';

export const schema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required')
});

export type ManageUserFormType = yup.InferType<typeof schema>;
