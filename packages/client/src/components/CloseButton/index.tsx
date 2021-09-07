import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import { CloseIcon } from '../Icon';

type Props = {
  placement?: 'left' | 'right';
  onClick?: () => void;
};

const CloseButton: FunctionComponent<Props> = ({
  placement = 'right',
  onClick
}) => {
  const history = useHistory();

  function handleClick() {
    onClick ? onClick() : history.goBack();
  }

  return (
    <Box as="section" padding="10px 0">
      <Box
        display="flex"
        as="button"
        ml="auto"
        margin={placement === 'right' ? '0 0 0 auto' : '0 auto 0 0'}
        width="45px"
        height="45px"
        borderRadius="50%"
        background="gray.100"
        transition="transform .2s ease"
        _hover={{ transform: 'scale(1.15)' }}
        onClick={handleClick}
      >
        <Box width="15px" height="15px" margin="auto">
          <CloseIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default CloseButton;
