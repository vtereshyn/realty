import { Box } from '@chakra-ui/react';
import { FunctionComponent, ReactNode, useEffect } from 'react';

/**
 * Components
 */
import Header from './components/Header';
import Footer from './components/Footer';
import { PageLoader } from './components/Loader';

/**
 * Queries
 */
import { useMeLazyQuery } from './generated/graphql';

/**
 * Reactive variables
 */
import { currentUserVar } from './apollo/cache/variables';

type Props = {
  children: ReactNode;
};

const App: FunctionComponent<Props> = ({ children }) => {
  const [me, { loading }] = useMeLazyQuery({
    onCompleted: ({ me: currentUser }) =>
      currentUserVar({
        ...currentUser,
        fullName: `${currentUser.firstName} ${currentUser.lastName}`
      })
  });

  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      me();
    }
  }, [me, isLoggedIn]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1 1 auto" display="flex">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
