import { FormikProps } from 'formik';
import { ReactNode } from 'react';

export type FormProps<T extends Record<string, unknown>> = Pick<
  FormikProps<T>,
  | 'values'
  | 'errors'
  | 'touched'
  | 'handleBlur'
  | 'handleChange'
  | 'handleSubmit'
  | 'setFieldValue'
> & { children: ReactNode };
