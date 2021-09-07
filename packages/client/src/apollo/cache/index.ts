import { InMemoryCache } from '@apollo/client';
import {
  UsersByQueryQuery,
  ApartmentsByQueryQuery
} from '../../generated/graphql';

/**
 * Reactive variables
 */
import { currentUserVar } from './variables';

export const cache: InMemoryCache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        usersByQuery: {
          keyArgs: ['input', ['role']],
          merge(
            existing: UsersByQueryQuery['usersByQuery'] = {
              items: [],
              total: 0
            },
            incoming: UsersByQueryQuery['usersByQuery']
          ) {
            return {
              ...incoming,
              items: [...existing.items, ...incoming.items]
            };
          }
        },

        apartmentsByQuery: {
          keyArgs: false,
          merge(
            existing: ApartmentsByQueryQuery['apartmentsByQuery'] = {
              items: [],
              total: 0
            },
            incoming: ApartmentsByQueryQuery['apartmentsByQuery']
          ) {
            return {
              ...incoming,
              items: [...existing.items, ...incoming.items]
            };
          }
        },

        currentUser() {
          return currentUserVar();
        }
      }
    }
  }
});
