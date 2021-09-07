import { Box, Heading } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import CloseButton from '../CloseButton';

type Props = {
  title: string;
  onClick?: () => void;
};

const PageHeader: FunctionComponent<Props> = ({ title, onClick }) => (
  <Box
    as="header"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    mb="20px"
  >
    <Heading as="h1" fontSize="large">
      {title}
    </Heading>
    <CloseButton onClick={onClick} />
  </Box>
);

export default PageHeader;
