import { useFormik } from 'formik';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Text, Button, VStack, Box } from '@chakra-ui/react';

/**
 * Components
 */
import PageHeader from '../../components/PageHeader';
import CreateApartmentForm from '../../components/Apartments/Form';

/**
 * Schema
 */
import {
  schema,
  ApartmentFormType
} from '../../components/Apartments/Form/schema';

/**
 * Reactive variables
 */
import { currentUserVar } from '../../apollo/cache/variables';

/**
 * Types & Queries
 */
import {
  UserRole,
  RoomsCount,
  useCreateApartmentMutation,
  ApartmentCreateInput
} from '../../generated/graphql';

const CreateApartmentScreen: FunctionComponent = () => {
  const history = useHistory();
  const currentUser = useReactiveVar(currentUserVar);
  const [createApartment, { loading, error }] = useCreateApartmentMutation({
    onCompleted: ({ createApartment: { id } }) => {
      history.push(`/apartments/view/${id}`);
    }
  });

  function submit({ address, coordinates, ...values }: ApartmentFormType) {
    const input: ApartmentCreateInput = {
      ...values,
      location: { address, coordinates }
    };
    createApartment({ variables: { input } });
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
  } = useFormik<ApartmentFormType>({
    initialValues: {
      name: '',
      size: 10,
      price: 100,
      description: '',
      roomsCount: RoomsCount.Room_1,
      realtorId: currentUser?.role === UserRole.Realtor ? currentUser.id : '',
      address: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    validationSchema: schema,
    onSubmit: submit
  });

  return (
    <Box width="100%" padding="25px 20px">
      <PageHeader title="Create apartment" />
      <VStack width="100%" spacing="20px" alignItems="flex-start">
        <CreateApartmentForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        >
          {error?.message && <Text color="red">{error.message}</Text>}
          <Button width={120} type="submit" isLoading={loading || isSubmitting}>
            Create
          </Button>
        </CreateApartmentForm>
      </VStack>
    </Box>
  );
};

export default CreateApartmentScreen;
