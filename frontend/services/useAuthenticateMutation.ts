import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { useMutation } from '@tanstack/react-query'
import { Mutation, MutationAuthenticateArgs } from '@/@types/gql'
import { mutationKeyFactory } from './keyFactory'

const AUTHENTICATE_MUTTATION = gql`
  mutation ($input: AuthenticateInput!) {
    authenticate(input: $input)
  }
`

export async function authenticate(args: MutationAuthenticateArgs) {
  return await graphqlClient.request<Mutation, MutationAuthenticateArgs>(
    AUTHENTICATE_MUTTATION,
    args
  )
}

export function useAuthenticateMutation() {
  return useMutation<
    Mutation,
    unknown,
    MutationAuthenticateArgs
  >({
    mutationKey: mutationKeyFactory.authenticate(),
    mutationFn: authenticate,
    gcTime: 0
  })
}


