import {
  Route,
  Switch,
  RouteComponentProps,
  BrowserRouter as Router
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { FunctionComponent, lazy, Suspense, useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

/**
 * Apollo client
 */
import client from './apollo';

/**
 * Components
 */
import App from './App';
import { PageLoader } from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Routes
 */
import { routes } from './routes';

const Routes: FunctionComponent = () => {
  /**
   * Route components lazy loading
   */
  const routeComponents = useMemo(
    () =>
      routes.map(({ url: path, component, isProtected }) => {
        const LoadedComponent = lazy(() => import(`./screens/${component}`));

        const componentProps = {
          path,
          exact: true,
          key: component,
          component: (props: RouteComponentProps) => (
            <LoadedComponent {...props} />
          )
        };

        if (isProtected) {
          return <ProtectedRoute {...componentProps} />;
        }

        return <Route {...componentProps} key={component} />;
      }),
    []
  );

  return <Switch>{routeComponents}</Switch>;
};

const Root: FunctionComponent = () => (
  <Router>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <App>
          <Suspense fallback={<PageLoader />}>
            <Routes />
          </Suspense>
        </App>
      </ChakraProvider>
    </ApolloProvider>
  </Router>
);

export default Root;
