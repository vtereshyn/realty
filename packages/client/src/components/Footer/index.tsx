import { Box } from '@chakra-ui/layout';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { pathByComponentName } from '../../routes';

const Footer: FunctionComponent = () => {
  const history = useHistory();

  function handleLogo() {
    history.push(pathByComponentName.IndexPageScreen);
  }

  return (
    <Box
      as="footer"
      borderTop="1px solid #e2e8f0"
      role="contentinfo"
      flexShrink={0}
      padding="25px 20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box role="button" color="teal" fontSize="14px" textTransform="uppercase">
        &copy; {new Date().getFullYear()}
      </Box>

      <Box
        role="button"
        color="teal"
        textTransform="uppercase"
        letterSpacing="1.25px"
        fontWeight="600"
        fontFamily="fantasy"
        onClick={handleLogo}
      >
        Realty
      </Box>
    </Box>
  );
};

export default Footer;
