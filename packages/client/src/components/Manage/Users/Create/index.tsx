import {
  Box,
  Text,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { FunctionComponent, useState } from 'react';

import SignupForm from './Form';
import PageHeader from '../../../PageHeader';

/**
 * Mutation
 */
import {
  UserRole,
  useCreateClientMutation,
  useCreateRealtorMutation,
  UsersByQueryDocument
} from '../../../../generated/graphql';

/**
 * Validation schema
 */
import { schema, SignupFormType } from './Form/schema';

type Props = {
  onMutationCompleted: () => void;
};

const CreateUser: FunctionComponent<Props> = ({ onMutationCompleted }) => {
  const { role } = useParams<{ role: UserRole }>();
  const [userRole, setUserRole] = useState<UserRole>(role || UserRole.Client);

  const [
    createClient,
    { error: clientCreatingError, loading: clientCreating }
  ] = useCreateClientMutation({
    refetchQueries: [
      {
        query: UsersByQueryDocument,
        variables: {
          input: { role: UserRole.Client }
        }
      }
    ],
    onCompleted: onMutationCompleted
  });

  const [
    createRealtor,
    { error: realtorCreatingError, loading: realtorCreating }
  ] = useCreateRealtorMutation({
    refetchQueries: [
      {
        query: UsersByQueryDocument,
        variables: {
          input: { role: UserRole.Realtor }
        }
      }
    ],
    onCompleted: onMutationCompleted
  });

  function submit({ passwordConfirmation, ...values }: SignupFormType) {
    switch (userRole) {
      case UserRole.Realtor:
        return createRealtor({ variables: { input: values } });
      case UserRole.Client:
      default:
        return createClient({ variables: { input: values } });
    }
  }

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik<SignupFormType>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: ''
    },
    validationSchema: schema,
    onSubmit: submit
  });

  return (
    <Box width="100%" padding="25px 20px">
      {role && <PageHeader title={`Create ${role}`} />}

      <VStack width="100%" spacing="20px" margin="auto">
        {!role && (
          <>
            <Heading size="xl" as="h1">
              Welcome to the Realty App!
            </Heading>
            <Heading size="sm" as="h3">
              Please, tell us how do you want to use this application?
            </Heading>
          </>
        )}
        {!role && (
          <RadioGroup
            value={userRole}
            onChange={val => setUserRole(val as UserRole)}
          >
            <Stack direction="row">
              {Object.values(UserRole)
                .filter(val => val !== UserRole.Admin)
                .map(role => (
                  <Radio key={role} value={role}>
                    {`As a ${role}`}
                  </Radio>
                ))}
            </Stack>
          </RadioGroup>
        )}
        <SignupForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        >
          {(clientCreatingError || realtorCreatingError) && (
            <Text color="red">
              {clientCreatingError?.message || realtorCreatingError?.message}
            </Text>
          )}

          <Button
            width={120}
            type="submit"
            isLoading={isSubmitting || clientCreating || realtorCreating}
          >
            {role ? 'Create' : 'Signup'}
          </Button>
        </SignupForm>
      </VStack>
    </Box>
  );
};

export default CreateUser;
