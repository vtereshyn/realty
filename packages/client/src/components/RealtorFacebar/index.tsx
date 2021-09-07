import { Avatar, Box, ThemeTypings } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Realtor } from '../../generated/graphql';

type Props = {
  isListItem?: boolean;
  size?: ThemeTypings['components']['Avatar']['sizes'];
  realtor: Pick<Realtor, 'firstName' | 'lastName' | 'email'>;
};

const RealtorFacebar: FunctionComponent<Props> = ({
  isListItem = true,
  size = 'lg',
  realtor
}) => (
  <Box as="article" display="flex" alignItems="center">
    <Avatar size={size} name={`${realtor.firstName} ${realtor.lastName}`} />
    <Box as="div" ml="3">
      <Box
        fontWeight="bold"
        as="p"
      >{`${realtor.firstName} ${realtor.lastName}`}</Box>
      {isListItem ? (
        <Box as="p">{realtor.email}</Box>
      ) : (
        <Box as="a" href={`mailto:${realtor.email}`}>
          {realtor.email}
        </Box>
      )}
    </Box>
  </Box>
);

export default RealtorFacebar;
