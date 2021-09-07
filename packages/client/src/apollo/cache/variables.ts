import { makeVar } from '@apollo/client';
import { MeQuery } from '../../generated/graphql';

type CurrentUser = MeQuery['me'] & {
  fullName: string;
};

export const currentUserVar = makeVar<CurrentUser | null>(null);
