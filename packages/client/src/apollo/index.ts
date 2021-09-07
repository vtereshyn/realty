import { ApolloClient, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { logout } from '../lib/utils';

import { cache } from './cache';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
});

const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.[0].message === 'Unauthorized') {
    logout()
      .then(() => location.reload())
      .catch(e => e);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: from([logoutLink, authLink, httpLink]),
  cache
});

export default client;
