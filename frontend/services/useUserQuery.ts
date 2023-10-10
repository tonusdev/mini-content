import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { Query } from '@/@types/gql'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from './keyFactory'

const USER_QUERY = gql`
  query  {
    user {
      id
      firstName
    }
  }
`

export async function fetchUser() {
  return await graphqlClient.request<Query>(USER_QUERY)
}

export function useUserQuery() {
  return useQuery<Query, unknown>({
    queryKey: queryKeyFactory.user(),
    queryFn: fetchUser,
  })
}
