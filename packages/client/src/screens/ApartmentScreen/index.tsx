import {
  Badge,
  Box,
  Button,
  Grid,
  HStack,
  Switch,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useReactiveVar } from '@apollo/client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { useHistory, useParams } from 'react-router-dom';

/**
 * Components
 */
import PageHeader from '../../components/PageHeader';
import { PageLoader } from '../../components/Loader';
import RealtorFacebar from '../../components/RealtorFacebar';
import PermissionRender from '../../components/PermissionRender';
import DeleteApartmentModal from '../../components/Modals/DeleteApartment';

/**
 * Queries
 */
import {
  UserRole,
  RentStatus,
  ApartmentDocument,
  useApartmentQuery,
  useUpdateApartmentMutation
} from '../../generated/graphql';

/**
 * Constants
 */
import { ROOMS_ENUM_TO_VALUES } from '../../lib/constants';

/**
 * Reactive variables
 */
import { currentUserVar } from '../../apollo/cache/variables';

import { pathByComponentName } from '../../routes';

const ApartmentScreen: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const currentUser = useReactiveVar(currentUserVar);

  const { data } = useApartmentQuery({
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  const [updateApartment, { loading: isUpdating }] = useUpdateApartmentMutation(
    {
      refetchQueries: [
        { query: ApartmentDocument, variables: { id } },
        'apartmentsByQuery'
      ]
    }
  );

  function handleClose() {
    history.push(pathByComponentName.SearchApartmentScreen);
  }

  function handleEdit() {
    history.push(`/apartments/update/${id}`);
  }

  function handleUpdateStatus() {
    if (data) {
      const {
        apartment: { status }
      } = data;
      if (status === RentStatus.Available) {
        updateApartment({
          variables: { id, input: { status: RentStatus.Rented } }
        });
      } else {
        updateApartment({
          variables: { id, input: { status: RentStatus.Available } }
        });
      }
    }
  }

  if (!data) {
    return <PageLoader />;
  }

  if (data) {
    const {
      apartment: {
        size,
        name,
        price,
        status,
        location: { address },
        realtor,
        pictures,
        roomsCount,
        description
      }
    } = data;
    return (
      <Box as="section" width="100%" padding="25px 20px">
        <PageHeader title={name} onClick={handleClose} />
        <DeleteApartmentModal isOpen={isOpen} onClose={onClose} />
        <Box as="div" display="flex" padding="20px 0">
          <Box
            as="section"
            width="100%"
            maxWidth="calc(max(670px, 50%))"
            marginRight="30px"
          >
            <Carousel showIndicators={false}>
              {pictures.map(picture => (
                <Box key={picture} as="div" height="100%">
                  <img
                    alt={name}
                    src={picture}
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box as="section" width="100%">
            <PermissionRender allowed={[UserRole.Admin, UserRole.Realtor]}>
              <HStack mb="5" align="center" width="100%" as="div">
                <Box width="100%" as="section" display="flex">
                  <Text mr="2">Rented</Text>
                  <Switch
                    size="lg"
                    colorScheme="teal"
                    disabled={isUpdating}
                    isChecked={status === RentStatus.Available}
                    onChange={handleUpdateStatus}
                  />
                  <Text ml="2">Available</Text>
                </Box>
                <Button
                  width="75px"
                  type="button"
                  colorScheme="teal"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  width="80px"
                  type="button"
                  onClick={onOpen}
                >
                  Delete
                </Button>
              </HStack>
            </PermissionRender>

            <Box mb="5">
              <PermissionRender allowed={[UserRole.Client]}>
                {status === RentStatus.Available ? (
                  <Badge
                    mb="1"
                    ml="-1"
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                  >
                    Available
                  </Badge>
                ) : (
                  <Badge
                    mb="1"
                    ml="-1"
                    borderRadius="full"
                    px="2"
                    colorScheme="gray"
                  >
                    Rented
                  </Badge>
                )}
              </PermissionRender>
              <Box as="p">{address}</Box>
            </Box>

            <Grid
              mb="5"
              alignItems="center"
              gap="5px"
              gridTemplateColumns="60px 1fr"
            >
              <Text>Price:</Text>
              <Text as="p" fontSize="lg" fontWeight="extrabold">
                {`${price}$`}
                <Box
                  as="span"
                  color="gray.600"
                  fontWeight="light"
                  fontSize="sm"
                >
                  / mth
                </Box>
              </Text>

              <Text>Size:</Text>
              <Text as="p" fontSize="lg" fontWeight="extrabold">
                {`${size} м²`}
              </Text>

              <Text>Rooms:</Text>
              <Text as="p" fontSize="lg" fontWeight="extrabold">
                {`${[ROOMS_ENUM_TO_VALUES[roomsCount]]}`}
              </Text>
            </Grid>

            <Text mb="10" fontWeight="400" as="p" lineHeight="tight">
              {description}
            </Text>

            {currentUser?.role !== UserRole.Realtor && (
              <RealtorFacebar isListItem={false} realtor={realtor} />
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return null;
};

export default ApartmentScreen;
