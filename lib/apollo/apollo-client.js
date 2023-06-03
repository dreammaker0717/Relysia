import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'node-fetch';
import { Agent } from 'https';

const WORDPRESS_GRAPHQL_ENDPOINT = 'https://cms.vaionex.com/relysia/graphql'

const agent = new Agent({
  rejectUnauthorized: false
});

const httpLink = new HttpLink({
  uri: WORDPRESS_GRAPHQL_ENDPOINT,
  fetch: fetch,
  fetchOptions: {
    agent: agent
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default apolloClient