import { Box } from '@chakra-ui/layout';
import { Avatar, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FunctionComponent, memo, useRef, useState } from 'react';
import { useApolloClient, useReactiveVar } from '@apollo/client';

/**
 * Reactive variables
 */
import { currentUserVar } from '../../apollo/cache/variables';

/**
 * Components
 */
import PermissionRender from '../PermissionRender';

/**
 * Hooks
 */
import useOnClickOutside from '../../hooks/useOnClickOutside';

/**
 * Utils
 */
import { logout } from '../../lib/utils';

/**
 * Types
 */
import { UserRole } from '../../generated/graphql';

/**
 * Routes
 */
import { pathByComponentName } from '../../routes';

type LeftBarProps = {
  userRole?: UserRole;
};

const LeftBar: FunctionComponent<LeftBarProps> = memo(({ userRole }) => {
  const history = useHistory();

  function handleLogo() {
    history.push(pathByComponentName.IndexPageScreen);
  }

  return (
    <Box as="section" display="inline-flex" alignItems="flex-end">
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
      <PermissionRender allowed={[UserRole.Admin, UserRole.Realtor]}>
        <Box
          role="button"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="1.25px"
          fontWeight="500"
          fontSize="10px"
          fontFamily="heading"
          onClick={handleLogo}
        >
          {userRole}
        </Box>
      </PermissionRender>
    </Box>
  );
});

type RightBarProps = {
  fullName: string;
};

const RightBar: FunctionComponent<RightBarProps> = memo(({ fullName }) => {
  const history = useHistory();
  const client = useApolloClient();
  const [isDropdownVisible, toggleDropdown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => toggleDropdown(false));

  async function handleLogout() {
    await client.resetStore();
    currentUserVar(null);
    await logout();
    toggleDropdown(false);
    return history.replace(pathByComponentName.LoginScreen);
  }

  return (
    <Box as="section">
      <Box position="relative" display="flex" alignItems="center" ref={ref}>
        <PermissionRender allowed={[UserRole.Admin]}>
          <Button
            mr="15px"
            type="button"
            onClick={() => history.push(pathByComponentName.ManageScreen)}
          >
            Manage
          </Button>
        </PermissionRender>
        <Avatar
          aria-haspopup="listbox"
          aria-expanded={isDropdownVisible}
          role="button"
          size="sm"
          bg="teal"
          color="white"
          name={fullName}
          onClick={() => toggleDropdown(!isDropdownVisible)}
        />
        {isDropdownVisible && (
          <Box
            zIndex={99}
            background="#fff"
            as="div"
            position="absolute"
            right="0"
            boxShadow="base"
            transform="translateY(100%)"
          >
            <Box as="ul" listStyleType="none">
              <Box
                as="li"
                transition="color .2s ease"
                padding="10px 20px"
                _hover={{ color: 'teal' }}
              >
                <Box
                  as="button"
                  letterSpacing="1px"
                  fontSize="11px"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  onClick={handleLogout}
                >
                  logout
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
});

const Header: FunctionComponent = () => {
  const currentUser = useReactiveVar(currentUserVar);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      as="header"
      borderBottom="1px solid #e2e8f0"
      flexShrink={0}
      padding="21px 20px"
    >
      <LeftBar userRole={currentUser?.role} />
      {currentUser && <RightBar fullName={currentUser.fullName} />}
    </Box>
  );
};

export default Header;
