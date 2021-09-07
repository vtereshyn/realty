import { useFormik } from 'formik';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Text, Button, Heading, VStack } from '@chakra-ui/react';

/**
 * Components
 */
import LoginForm from '../../components/Login/Form';

/**
 * Mutation
 */
import { useLoginMutation } from '../../generated/graphql';

/**
 * Validation schema
 */
import { LoginFormType, schema } from '../../components/Login/Form/schema';

import { pathByComponentName } from '../../routes';

/**
 * Reactive variables
 */
import { currentUserVar } from '../../apollo/cache/variables';

const LoginScreen: FunctionComponent = () => {
  const history = useHistory();

  const [login, { error, loading }] = useLoginMutation({
    onCompleted: ({ login: { user, token } }) => {
      currentUserVar({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`
      });
      localStorage.setItem('token', token);
      history.replace(pathByComponentName.IndexPageScreen);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik<LoginFormType>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: values => login({ variables: { input: values } })
  });

  return (
    <VStack width="100%" spacing="20px" margin="auto">
      <Heading size="xl" as="h1">
        Login to app
      </Heading>
      <LoginForm
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
      >
        {error?.message && <Text color="red">{error.message}</Text>}

        <Button width={120} type="submit" isLoading={isSubmitting || loading}>
          login
        </Button>

        <Text>or</Text>

        <Button
          as="a"
          width={120}
          type="button"
          href={pathByComponentName.SignupScreen}
        >
          signup
        </Button>
      </LoginForm>
    </VStack>
  );
};

export default LoginScreen;
