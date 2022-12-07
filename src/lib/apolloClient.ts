import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { IncomingMessage } from 'http';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const GRAPHQL_ENDPOINT = publicRuntimeConfig?.GRAPHQL_ENDPOINT;

let apolloClient: ApolloClient<InMemoryCache>;

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: unknown) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation).map((data) => {
    // ...modify result as desired here...
    return data;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error(JSON.stringify(graphQLErrors, null, 4));
  }

  if (networkError) {
    console.error(JSON.stringify(networkError, null, 4));
  }
});

const uploadLink = createUploadLink({ uri: GRAPHQL_ENDPOINT, credentials: 'include' });

function createApolloClient(req?: IncomingMessage) {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        cookie: req?.headers?.cookie || '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: from([errorLink, authLink, cleanTypeName, uploadLink]),
    cache: new InMemoryCache({
      possibleTypes: {
        CheckoutFieldUnion: [
          'CheckoutField',
          'CheckoutOptionsField',
          'CheckoutExtraInfoField',
          'CheckoutTermsCheckboxField',
        ],
        ActivityWithLocation: ['TicketActivity', 'RentalActivity', 'AccommodationActivity'],
        Activity: ['TicketActivity', 'RentalActivity', 'AccommodationActivity', 'GiftCardActivity'],
        Product: ['TicketProduct', 'RentalProduct', 'AccommodationProduct', 'GiftCardProduct'],
      },
      typePolicies: {
        Event: {
          keyFields: ['event', ['id']],
        },
        AccommodationEvent: {
          keyFields: ['event', ['id']],
        },
        ProductForm: {
          keyFields: [],
        },
        InvitedUser: {
          keyFields: ['email'],
        },
      },
    }),
  });
}

export function initializeApollo(initialState?: any, req?: IncomingMessage) {
  const _apolloClient = apolloClient ?? createApolloClient(req);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState?: any, req?: IncomingMessage) {
  const store = useMemo(() => initializeApollo(initialState, req), [initialState, req]);
  return store;
}
