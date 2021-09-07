import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

/**
 * Components
 */
import NoResults from '../../../NoResults';
import { PrimaryLoader } from '../../../Loader';
import RealtorFacebar from '../../../RealtorFacebar';
import PaginatedContainer from '../../../PaginatedContainer';

/**
 * Queries
 */
import { UserRole, useUsersByQueryQuery } from '../../../../generated/graphql';

type Props = {
  activeId?: string | null;
  onRealtorClick: (id: string) => void;
};

const Realtors: FunctionComponent<Props> = ({ activeId, onRealtorClick }) => {
  const { data, loading, fetchMore } = useUsersByQueryQuery({
    variables: { input: { role: UserRole.Realtor, pagination: { take: 5 } } }
  });

  if (loading) {
    return <PrimaryLoader />;
  }

  if (data) {
    const {
      usersByQuery: { total, items }
    } = data;

    return (
      <Box padding="10px 0" as="ul" maxHeight={300} overflowY="auto">
        {items.length ? (
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
            {items.map(realtor => (
              <Box
                as="li"
                padding="15px"
                background={activeId === realtor.id ? '#f1f1f1' : 'none'}
                borderRadius="10px"
                role="button"
                key={realtor.id}
                onClick={() => onRealtorClick(realtor.id)}
              >
                <RealtorFacebar size="md" realtor={realtor} />
              </Box>
            ))}
          </PaginatedContainer>
        ) : (
          <NoResults
            title="No realtors"
            description="Please wait until realtors created or create new one yourself"
          />
        )}
      </Box>
    );
  }

  return null;
};

export default Realtors;
