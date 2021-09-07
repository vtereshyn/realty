import { getIn } from 'formik';
import { FunctionComponent, useCallback } from 'react';
import {
  Input,
  VStack,
  Container,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';

/**
 * Types
 */
import { FormProps } from '../../../lib/types';
import { LoginFormType } from './schema';

type Props = FormProps<LoginFormType>;

const Form: FunctionComponent<Props> = ({
  errors,
  touched,
  children,
  handleBlur,
  handleChange,
  handleSubmit
}) => {
  const getFieldError = useCallback(
    (name: keyof LoginFormType) =>
      getIn(errors, name) && getIn(touched, name) ? getIn(errors, name) : '',
    [errors, touched]
  );

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      height="100%"
    >
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isInvalid={getFieldError('email')}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              size="lg"
              id="email"
              name="email"
              type="text"
              placeholder="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>{getFieldError('email')}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={getFieldError('password')}>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>{getFieldError('password')}</FormErrorMessage>
          </FormControl>
          {children}
        </VStack>
      </form>
    </Container>
  );
};

export default Form;
