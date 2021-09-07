import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';

/**
 * Mutation
 */
import {
  UserRole,
  useDeleteUserMutation,
  User
} from '../../../generated/graphql';
import Realtors from '../../Apartments/Form/Realtors';

type Props = {
  userRole: UserRole;
  isOpen: boolean;
  userId: string;
  onClose: () => void;
};

const DeleteUserModal: FunctionComponent<Props> = ({
  userRole,
  userId,
  isOpen,
  onClose
}) => {
  const [newRealtorId, setRealtorId] = useState<string | null>(null);

  const [deleteUser, { loading }] = useDeleteUserMutation({
    onCompleted: () => {
      onClose();
    },
    update(cache) {
      cache.modify({
        fields: {
          usersByQuery(existingUserRefs, { readField }) {
            return {
              ...existingUserRefs,
              items: existingUserRefs.items.filter(
                (ref: User) => userId !== readField('id', ref)
              )
            };
          }
        }
      });
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Delete ${userRole}`}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {userRole === UserRole.Realtor ? (
            <>
              <Text>
                If you remove the realtor, you need to update all related
                appartments with new one
              </Text>
              <Realtors activeId={newRealtorId} onRealtorClick={setRealtorId} />
            </>
          ) : (
            <Text>Are you sure you want remove this client?</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            isLoading={loading}
            onClick={() =>
              deleteUser({
                variables: {
                  input: {
                    id: userId,
                    role: userRole,
                    newRealtorId
                  }
                }
              })
            }
          >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
