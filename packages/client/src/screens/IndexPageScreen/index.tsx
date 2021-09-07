import { FunctionComponent } from 'react';
import { Box, Button, Heading, HStack } from '@chakra-ui/react';

import { pathByComponentName } from '../../routes';
import { useHistory } from 'react-router-dom';
import {
  AllDayLongIcon,
  BuildingIcon,
  CustomerIcon
} from '../../components/Icon';

const IndexPageScreen: FunctionComponent = () => {
  const history = useHistory();

  function handleSearch() {
    history.push(pathByComponentName.SearchApartmentScreen);
  }

  return (
    <Box as="section" width="100%">
      <Box
        as="section"
        bgSize="cover"
        display="flex"
        padding="15em 0"
        flexDirection="column"
        justifyContent="center"
        bgImage="https://images.unsplash.com/photo-1561542320-ec5c88087ab4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      >
        <Heading as="h2" mb="2" size="lg" textAlign="center" color="#fff">
          Save your time and rent apartment with us!
        </Heading>
        <Heading
          as="p"
          mb="3"
          size="xs"
          textAlign="center"
          color="#fff"
          fontWeight="400"
        >
          We are showing the best deals to you
        </Heading>
        <Button
          display="flex"
          minWidth="150"
          margin="20px auto"
          cursor="pointer"
          colorScheme="teal"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box as="section" padding="100px 20px" maxWidth="1100px" margin="0 auto">
        <HStack justifyContent="space-between" spacing="50px">
          <Box
            as="article"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box width="150px" height="150px" mb="30px">
              <CustomerIcon />
            </Box>
            <Heading as="h4" size="md">
              30000+ <br /> customers
            </Heading>
          </Box>

          <Box
            as="article"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box width="150px" height="150px" mb="30px">
              <AllDayLongIcon />
            </Box>
            <Heading as="h4" size="md">
              Available <br /> to book 24/7
            </Heading>
          </Box>

          <Box
            as="article"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Box width="150px" height="150px" mb="30px">
              <BuildingIcon />
            </Box>
            <Heading as="h4" size="md">
              100+ <br /> apartments
            </Heading>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default IndexPageScreen;
