import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { ClipLoader } from 'react-spinners';

const wrapperStyles = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999
};

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
};

type Props = {
  size?: number;
};

export const PrimaryLoader: FunctionComponent<Props> = ({ size = 15 }) => (
  <Box {...containerStyles}>
    <ClipLoader size={size} />
  </Box>
);

export const PageLoader: FunctionComponent = () => (
  <Box position="fixed" {...wrapperStyles}>
    <PrimaryLoader size={20} />
  </Box>
);
