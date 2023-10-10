import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { useMutation } from '@tanstack/react-query'
import { Mutation, MutationUpdateArticleArgs } from '@/@types/gql'
import { mutationKeyFactory } from './keyFactory'


const UPDATE_ARTICLE_MUTTATION = gql`
  mutation ($input: UpdateArticleInput!) {
    updateArticle(input: $input)
  }
`

export async function updateArticle(args: MutationUpdateArticleArgs) {
  return await graphqlClient.request<Mutation, MutationUpdateArticleArgs>(
    UPDATE_ARTICLE_MUTTATION,
    args
  )
}

export function useUpdateArticleMutation() {
  return useMutation<
    Mutation,
    unknown,
    MutationUpdateArticleArgs
  >({
    mutationKey: mutationKeyFactory.updateArticle(),
    mutationFn: updateArticle,
    gcTime: 0
  })
}


