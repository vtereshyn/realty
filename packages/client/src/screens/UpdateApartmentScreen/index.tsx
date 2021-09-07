import { useFormik } from 'formik';
import { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Text, Button, VStack, HStack, Box } from '@chakra-ui/react';

/**
 * Components
 */
import PageHeader from '../../components/PageHeader';
import UpdateApartmentForm from '../../components/Apartments/Form';

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
  ApartmentUpdateInput,
  useApartmentQuery,
  useUpdateApartmentMutation
} from '../../generated/graphql';

const UpdateApartmentScreen: FunctionComponent = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const currentUser = useReactiveVar(currentUserVar);

  const { data } = useApartmentQuery({ variables: { id } });

  const [updateApartment, { loading: isUpdating, error }] =
    useUpdateApartmentMutation({
      onCompleted: () => {
        history.push(`/apartments/view/${id}`);
      },
      refetchQueries: ['apartment', 'apartmentsByQuery']
    });

  function submit({ address, coordinates, ...values }: ApartmentFormType) {
    const input: ApartmentUpdateInput = {
      ...values,
      location: { address, coordinates }
    };
    updateApartment({ variables: { id, input } });
  }

  function setInitialValues() {
    if (data) {
      const {
        apartment: { id, realtor, location, ...apartment }
      } = data;
      return {
        ...apartment,
        ...location,
        realtorId: realtor.id
      };
    }

    return {
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
    };
  }

  const {
    dirty,
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setSubmitting
  } = useFormik<ApartmentFormType>({
    enableReinitialize: true,
    initialValues: setInitialValues(),
    validationSchema: schema,
    onSubmit: values => {
      submit(values);
      setSubmitting(false);
    }
  });

  return (
    <Box width="100%" padding="25px 20px">
      <PageHeader title="Update apartment" />
      <VStack width="100%" spacing="20px" alignItems="flex-start">
        <UpdateApartmentForm
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        >
          {error?.message && <Text color="red">{error.message}</Text>}
          <HStack justifyContent="center" spacing="10px">
            <Button
              width={120}
              type="submit"
              isDisabled={!dirty}
              isLoading={isUpdating || isSubmitting}
            >
              Update
            </Button>
          </HStack>
        </UpdateApartmentForm>
      </VStack>
    </Box>
  );
};

export default UpdateApartmentScreen;
