import { useHistory } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
import { FunctionComponent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * Components
 */
import Map from '../../components/Map';
import NoResults from '../../components/NoResults';
import PageHeader from '../../components/PageHeader';
import SearchFilters from '../../components/Search/Filters';
import ApartmentsList from '../../components/Apartments/List';
import PermissionRender from '../../components/PermissionRender';
import { PageLoader, PrimaryLoader } from '../../components/Loader';

/**
 * Queries
 */
import {
  UserRole,
  Apartment,
  RoomsCount,
  ApartmentQueryInput,
  useApartmentsByQueryQuery
} from '../../generated/graphql';

/**
 * Routes
 */
import { pathByComponentName } from '../../routes';

const SearchApartmentScreen: FunctionComponent = () => {
  const history = useHistory();
  const { data, loading, refetch, fetchMore } = useApartmentsByQueryQuery({
    variables: { input: {} }
  });

  const [filters, setFilters] = useState<ApartmentQueryInput>({});
  const [activePin, setActive] = useState<Apartment['id'] | null>(null);

  useEffect(() => {
    refetch({ input: filters });
  }, [filters, refetch]);

  function handleFilterChange(
    key: 'id' | 'roomsCount' | 'price' | 'size',
    value?: string | number | RoomsCount
  ) {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  }

  function handlePin(apartmentId: Apartment['id']) {
    setActive(apartmentId);
    handleFilterChange('id', apartmentId);
  }

  function handleResetActiveApartment() {
    setActive(null);
    handleFilterChange('id', undefined);
  }

  function handleApartmentCreate() {
    history.push(pathByComponentName.CreateApartmentScreen);
  }

  if (loading) {
    return <PageLoader />;
  }

  if (data) {
    const {
      apartmentsByQuery: { total, items }
    } = data;

    const pins = items.map(
      ({ id: apartmentId, status, location: { coordinates } }) => ({
        status,
        apartmentId,
        coordinates
      })
    );

    return (
      <Box as="section" width="100%">
        <Box display="flex" height="calc(100vh - 75px - 75px)">
          <Box
            overflow="auto"
            width="100%"
            padding="0 20px 20px"
            maxWidth="calc(max(670px, 50%))"
            id="infinite"
          >
            {activePin ? (
              <PageHeader title="Back" onClick={handleResetActiveApartment} />
            ) : (
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
            <Box as="section">
              {items.length ? (
                <InfiniteScroll
                  loader={<PrimaryLoader />}
                  hasMore={total > items.length}
                  dataLength={items.length}
                  scrollableTarget="infinite"
                  next={() =>
                    fetchMore({
                      variables: {
                        input: {
                          ...filters,
                          pagination: { skip: items.length, take: 10 }
                        }
                      }
                    })
                  }
                >
                  <ApartmentsList apartments={items}>
                    <PermissionRender
                      allowed={[UserRole.Admin, UserRole.Realtor]}
                    >
                      <Box
                        minHeight={320}
                        role="button"
                        cursor="pointer"
                        border="1px solid teal"
                        borderRadius={10}
                        d="flex"
                        justifyContent="center"
                        alignItems="center"
                        onClick={handleApartmentCreate}
                        transition="all .2s ease-in"
                        _hover={{ borderStyle: 'dashed', opacity: 0.75 }}
                      >
                        <Text as="p" color="teal">
                          Create Apartment
                        </Text>
                      </Box>
                    </PermissionRender>
                  </ApartmentsList>
                </InfiniteScroll>
              ) : (
                <NoResults>
                  <PermissionRender
                    allowed={[UserRole.Admin, UserRole.Realtor]}
                  >
                    <Box
                      textAlign="center"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      or
                      <Button
                        mt="2"
                        colorScheme="gray"
                        onClick={handleApartmentCreate}
                      >
                        Create new one
                      </Button>
                    </Box>
                  </PermissionRender>
                </NoResults>
              )}
            </Box>
          </Box>
          <Box width="100%" maxWidth="calc(max(670px, 50%))">
            <Map pins={pins} onPinClick={handlePin} />
          </Box>
        </Box>
      </Box>
    );
  }

  return null;
};

export default SearchApartmentScreen;
