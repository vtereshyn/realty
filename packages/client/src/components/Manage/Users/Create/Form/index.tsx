import {
  Input,
  VStack,
  Container,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import { getIn } from 'formik';
import { FunctionComponent, useCallback } from 'react';

/**
 * Types
 */
import { FormProps } from '../../../../../lib/types';
import { SignupFormType } from './schema';

type Props = FormProps<SignupFormType>;

const Form: FunctionComponent<Props> = ({
  errors,
  touched,
  children,
  handleBlur,
  handleChange,
  handleSubmit
}) => {
  const getFieldError = useCallback(
    (name: keyof SignupFormType) =>
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
          <FormControl id="firstName" isInvalid={getFieldError('firstName')}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              size="lg"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Ex: Doe"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>{getFieldError('firstName')}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" isInvalid={getFieldError('email')}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              size="lg"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ex: Doe"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>{getFieldError('lastName')}</FormErrorMessage>
          </FormControl>

          <FormControl id="email" isInvalid={getFieldError('email')}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              size="lg"
              id="email"
              name="email"
              type="text"
              placeholder="Ex: Doe"
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

          <FormControl
            id="password"
            isInvalid={getFieldError('passwordConfirmation')}
          >
            <FormLabel>Confirm your password</FormLabel>
            <Input
              size="lg"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>
              {getFieldError('passwordConfirmation')}
            </FormErrorMessage>
          </FormControl>
          {children}
        </VStack>
      </form>
    </Container>
  );
};

export default Form;
