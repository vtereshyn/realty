import { Box, Image, Badge } from '@chakra-ui/react';
import { FunctionComponent, memo } from 'react';

/**
 * Types
 */
import { Apartment, Realtor, RentStatus } from '../../../generated/graphql';

/**
 * Constants
 */
import { ROOMS_ENUM_TO_VALUES } from '../../../lib/constants';

type Props = {
  apartment: Pick<
    Apartment,
    'id' | 'name' | 'price' | 'roomsCount' | 'status' | 'pictures' | 'location'
  > & {
    realtor?: Pick<Realtor, 'id' | 'firstName' | 'lastName' | 'email'>;
    description?: Apartment['description'];
  };
  onClick: (id: Apartment['id']) => void;
};

const ApartmentItem: FunctionComponent<Props> = memo(
  ({
    apartment: {
      id,
      name,
      roomsCount,
      price,
      status,
      pictures: [picture]
    },
    onClick
  }) => (
    <Box
      cursor="pointer"
      opacity={status === RentStatus.Available ? 1 : 0.5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={() => onClick(id)}
      transition="box-shadow .2s ease-in"
      _hover={{ boxShadow: 'base' }}
    >
      <Image
        alt={name}
        width="100%"
        minHeight="200"
        maxHeight={200}
        objectFit="cover"
        src={picture}
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {status === RentStatus.Available ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Available
            </Badge>
          ) : (
            <Badge borderRadius="full" px="2" colorScheme="gray">
              Rented
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {[ROOMS_ENUM_TO_VALUES[roomsCount]]} rooms
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Box>
          {`${price}$`}
          <Box as="span" color="gray.600" fontSize="sm">
            / mth
          </Box>
        </Box>
      </Box>
    </Box>
  )
);

export default ApartmentItem;
