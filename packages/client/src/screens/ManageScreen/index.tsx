import { FunctionComponent, ReactNode, useMemo } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

/**
 * Components
 */
import PageHeader from '../../components/PageHeader';
import { Clients, Realtors } from '../../components/Manage/Users';

/**
 * Types
 */
import { UserRole } from '../../generated/graphql';

const TABS_BY_USER_ROLE: {
  [key in UserRole]: ReactNode | null;
} = {
  [UserRole.Admin]: null,
  [UserRole.Client]: <Clients />,
  [UserRole.Realtor]: <Realtors />
};

const ManageScreen: FunctionComponent = () => {
  const filteresRoles = useMemo(
    () => Object.values(UserRole).filter(role => role !== UserRole.Admin),
    []
  );

  return (
    <Box as="section" width="100%" padding="25px 20px">
      <PageHeader title="Manage Users" />

      <Tabs isLazy variant="soft-rounded" colorScheme="teal">
        <TabList>
          {filteresRoles.map(role => (
            <Tab textTransform="capitalize" key={role}>
              {role}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {filteresRoles.map(role => (
            <TabPanel id={role} key={role}>
              {TABS_BY_USER_ROLE[role]}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ManageScreen;
