import { ComponentType, FunctionComponent } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { pathByComponentName } from '../../routes';

type Props = RouteProps & {
  component: ComponentType<any>;
};

const ProtectedRoute: FunctionComponent<Props> = ({
  render,
  component: Component,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Redirect to={pathByComponentName.LoginScreen} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default ProtectedRoute;
