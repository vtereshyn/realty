import { useReactiveVar } from '@apollo/client';
import { FunctionComponent, ReactNode } from 'react';

import { UserRole } from '../../generated/graphql';
import { currentUserVar } from '../../apollo/cache/variables';

type Props = {
  allowed: UserRole[];
  children: ReactNode;
};

const PermissionRender: FunctionComponent<Props> = ({ allowed, children }) => {
  const currentUser = useReactiveVar(currentUserVar);

  if (currentUser?.role) {
    return allowed.includes(currentUser.role) ? <>{children}</> : null;
  }

  return null;
};

export default PermissionRender;
