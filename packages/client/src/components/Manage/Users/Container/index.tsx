import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

/**
 * Types
 */
import { UserRole } from '../../../../generated/graphql';

type Props = {
  role: UserRole;
};

const UsersContainer: FunctionComponent<Props> = ({ role, children }) => {
  const history = useHistory();

  function handleCreate() {
    history.push(`/manage/users/create/${role}`);
  }

  return (
    <form>
      <Button
        mb="20px"
        display="flex"
        ml="auto"
        colorScheme="teal"
        onClick={handleCreate}
      >
        Create
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th pl="0">first name</Th>
            <Th>last name</Th>
            <Th>email</Th>
            <Th>updated</Th>
            <Th>created</Th>
            <Th textAlign="end" pr="0">
              actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </form>
  );
};

export default UsersContainer;
