import {
  Tr,
  Td,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { getIn, useFormik } from 'formik';
import { FunctionComponent, memo, useCallback, useState } from 'react';

/**
 * Components
 */
import DeleteUserModal from '../../../Modals/DeleteUser';

/**
 * Types & Queries
 */
import {
  UserRole,
  User as UserType,
  useUpdateUserMutation
} from '../../../../generated/graphql';
import { FormProps } from '../../../../lib/types';
import { ManageUserFormType, schema } from './schema';

type EditableColumnProps = Omit<
  FormProps<ManageUserFormType>,
  'values' | 'children' | 'setFieldValue' | 'handleSubmit'
> & {
  name: keyof ManageUserFormType;
  value: string;
  isEditing: boolean;
};

const EditableColumn: FunctionComponent<EditableColumnProps> = memo(
  ({ name, value, errors, touched, isEditing, handleBlur, handleChange }) => {
    const getFieldError = useCallback(
      (name: keyof ManageUserFormType) =>
        getIn(errors, name) && getIn(touched, name) ? getIn(errors, name) : '',
      [errors, touched]
    );

    return isEditing ? (
      <Td _first={{ paddingLeft: 0 }}>
        <FormControl isInvalid={getFieldError(name)}>
          <Input
            width="auto"
            name={name}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormErrorMessage>{getFieldError(name)}</FormErrorMessage>
        </FormControl>
      </Td>
    ) : (
      <Td _first={{ paddingLeft: 0 }}>{value}</Td>
    );
  }
);

type Props = {
  entity: Pick<
    UserType,
    'id' | 'firstName' | 'lastName' | 'email' | 'createdAt' | 'updatedAt'
  >;
  role: UserRole;
};

const User: FunctionComponent<Props> = memo(
  ({
    role,
    entity: { id, firstName, lastName, email, updatedAt, createdAt }
  }) => {
    const [isEditing, setEditing] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [updateUser, { loading: isUpdating }] = useUpdateUserMutation({
      onCompleted: () => {
        setEditing(false);
      },
      update(cache) {
        cache.modify({
          fields: {
            usersByQuery(_, { fieldName, readField }) {
              readField(fieldName);
            }
          }
        });
      }
    });

    const {
      values,
      errors,
      touched,
      isValid,
      handleBlur,
      handleChange,
      handleSubmit
    } = useFormik({
      initialValues: { email, firstName, lastName },
      validationSchema: schema,
      onSubmit: values => updateUser({ variables: { id, role, input: values } })
    });

    return (
      <Tr key={id}>
        <DeleteUserModal
          userId={id}
          userRole={role}
          isOpen={isOpen}
          onClose={onClose}
        />

        <EditableColumn
          errors={errors}
          touched={touched}
          isEditing={isEditing}
          name="firstName"
          value={values.firstName}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <EditableColumn
          errors={errors}
          touched={touched}
          isEditing={isEditing}
          name="lastName"
          value={values.lastName}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <EditableColumn
          errors={errors}
          touched={touched}
          isEditing={isEditing}
          name="email"
          value={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <Td>{dayjs(updatedAt).format('MMMM D, YYYY')}</Td>
        <Td>{dayjs(createdAt).format('MMMM D, YYYY')}</Td>
        <Td paddingRight="0" textAlign="end">
          {isEditing ? (
            <Button
              mr="10px"
              width="70px"
              colorScheme="teal"
              isLoading={isUpdating}
              isDisabled={!isValid}
              onClick={() => handleSubmit()}
            >
              Update
            </Button>
          ) : (
            <Button
              mr="10px"
              width="70px"
              type="button"
              colorScheme="gray"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button colorScheme="red" width="75px" type="button" onClick={onOpen}>
            Delete
          </Button>
        </Td>
      </Tr>
    );
  }
);

export default User;
