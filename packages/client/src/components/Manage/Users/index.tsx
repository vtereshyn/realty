import { FunctionComponent } from 'react';

/**
 * Components
 */
import User from './Item';
import NoResults from '../../NoResults';
import UsersContainer from './Container';
import { PrimaryLoader } from '../../Loader';
import PaginatedContainer from '../../PaginatedContainer';

/**
 * Types & Queries
 */
import { UserRole, useUsersByQueryQuery } from '../../../generated/graphql';
import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export const Realtors: FunctionComponent = () => {
  const history = useHistory();
  const { data, loading, fetchMore } = useUsersByQueryQuery({
    variables: { input: { role: UserRole.Realtor, pagination: { take: 10 } } }
  });

  function handleCreate() {
    history.push(`/manage/users/create/${UserRole.Realtor}`);
  }

  if (loading) {
    return <PrimaryLoader />;
  }

  if (data) {
    const {
      usersByQuery: { total, items }
    } = data;

    return items.length ? (
      <PaginatedContainer
        hasNext={!!items.length && total > items.length}
        isLoading={loading}
        next={() =>
          fetchMore({
            variables: {
              input: {
                role: UserRole.Realtor,
                pagination: { skip: items.length, take: 5 }
              }
            }
          })
        }
      >
        <UsersContainer role={UserRole.Realtor}>
          {items.map(user => (
            <User key={user.id} role={UserRole.Realtor} entity={user} />
          ))}
        </UsersContainer>
      </PaginatedContainer>
    ) : (
      <NoResults
        title="No realtors"
        description="Please wait until realtors created or create new one yourself"
      >
        <Button mt="10px" type="button" onClick={handleCreate}>
          create
        </Button>
      </NoResults>
    );
  }

  return null;
};

export const Clients: FunctionComponent = () => {
  const history = useHistory();

  const { data, loading, fetchMore } = useUsersByQueryQuery({
    variables: { input: { role: UserRole.Client, pagination: { take: 10 } } }
  });

  function handleCreate() {
    history.push(`/manage/users/create/${UserRole.Client}`);
  }

  if (loading) {
    return <PrimaryLoader />;
  }

  if (data) {
    const {
      usersByQuery: { total, items }
    } = data;

    return items.length ? (
      <PaginatedContainer
        isLoading={loading}
        hasNext={!!items.length && total > items.length}
        next={() =>
          fetchMore({
            variables: {
              input: {
                role: UserRole.Client,
                pagination: { skip: items.length, take: 5 }
              }
            }
          })
        }
      >
        <UsersContainer role={UserRole.Client}>
          {items.map(user => (
            <User key={user.id} role={UserRole.Client} entity={user} />
          ))}
        </UsersContainer>
      </PaginatedContainer>
    ) : (
      <NoResults
        title="No clients"
        description="Please wait until clients created or create new one yourself"
      >
        <Button mt="10px" type="button" onClick={handleCreate}>
          create
        </Button>
      </NoResults>
    );
  }

  return null;
};
