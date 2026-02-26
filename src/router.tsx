import {
  routerWithApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-tanstack-start'
import { HttpLink } from '@apollo/client'

import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  })

  const router = createRouter({
    routeTree,
    context: {
      ...routerWithApolloClient.defaultContext,
    },
  })

  return routerWithApolloClient(router, apolloClient)
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
