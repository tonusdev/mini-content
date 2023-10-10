import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { useMutation } from '@tanstack/react-query'
import { Mutation, MutationCreateArticleArgs } from '@/@types/gql'
import { mutationKeyFactory } from './keyFactory'

const CREATE_ARTICLE_MUTTATION = gql`
  mutation ($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      title
      content
      premiumContent
      views
      premiumViews
      updatedAt
      createdAt
    }
  }
`

export async function createArticle(args: MutationCreateArticleArgs) {
  return await graphqlClient.request<Mutation, MutationCreateArticleArgs>(
    CREATE_ARTICLE_MUTTATION,
    args
  )
}

export function useCreateArticleMutation() {
  return useMutation<
    Mutation,
    unknown,
    MutationCreateArticleArgs
  >({
    mutationKey: mutationKeyFactory.createArticle(),
    mutationFn: createArticle,
    gcTime: 0
  })
}


