import { Redirect } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { useEffect, useState, FunctionComponent, ComponentType } from 'react';

/**
 * Components
 */
import { PageLoader } from '../../Loader';

/**
 * Types
 */
import { UserRole } from '../../../generated/graphql';

/**
 * Reactive variables
 */
import { currentUserVar } from '../../../apollo/cache/variables';

/**
 * Utils
 */
import { pathByComponentName } from '../../../routes';

type Props = {
  component: ComponentType<any>;
  authorizedFor: readonly UserRole[];
};

const RoleBasedValidator: FunctionComponent<Props> = ({
  authorizedFor,
  component: Component
}) => {
  const currentUser = useReactiveVar(currentUserVar);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  // TODO: change redirects
  const REDIRECT_MAP: { [key in UserRole]: string } = {
    [UserRole.Admin]: pathByComponentName.IndexPageScreen,
    [UserRole.Client]: pathByComponentName.IndexPageScreen,
    [UserRole.Realtor]: pathByComponentName.IndexPageScreen
  };

  useEffect(() => {
    if (currentUser) {
      return setIsAllowed(authorizedFor.includes(currentUser.role));
    }
  }, [currentUser, authorizedFor]);

  if (!currentUser) {
    return <PageLoader />;
  }

  if (isAllowed === false && currentUser) {
    return <Redirect to={REDIRECT_MAP[currentUser.role]} />;
  }

  return <Component />;
};

export default RoleBasedValidator;
