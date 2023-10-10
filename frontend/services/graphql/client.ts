import { GraphQLClient } from 'graphql-request'
import { getClientEnv } from '@/environment/client'

export const graphqlClient = new GraphQLClient(getClientEnv().graphqlEndpoint)
