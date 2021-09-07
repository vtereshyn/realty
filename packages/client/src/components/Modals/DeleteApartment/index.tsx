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
import { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';

/**
 * Mutation
 */
import { useDeleteApartmentMutation } from '../../../generated/graphql';

import { pathByComponentName } from '../../../routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteApartmentModal: FunctionComponent<Props> = ({
  isOpen,
  onClose
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [deleteApartment, { loading }] = useDeleteApartmentMutation({
    refetchQueries: ['apartmentsByQuery'],
    onCompleted: () => {
      onClose();
      history.push(pathByComponentName.SearchApartmentScreen);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Apartment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this apartment?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            isLoading={loading}
            onClick={() => deleteApartment({ variables: { id } })}
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

export default DeleteApartmentModal;
