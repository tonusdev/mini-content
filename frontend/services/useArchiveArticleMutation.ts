import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Article,
  Mutation,
  MutationArchiveArticleArgs,
  Query,
} from '@/@types/gql'
import { mutationKeyFactory, queryKeyFactory } from './keyFactory'

const ARCHIVE_ARTICLE_MUTTATION = gql`
  mutation ($input: ArchiveArticleInput!) {
    archiveArticle(input: $input)
  }
`

export async function archiveArticle(args: MutationArchiveArticleArgs) {
  return await graphqlClient.request<Mutation, MutationArchiveArticleArgs>(
    ARCHIVE_ARTICLE_MUTTATION,
    args
  )
}

export function useArchiveArticleMutation() {
  const queryClient = useQueryClient()
  return useMutation<Mutation, unknown, MutationArchiveArticleArgs>({
    mutationKey: mutationKeyFactory.archiveArticle(),
    mutationFn: archiveArticle,
    gcTime: 0,
    onSuccess: (data, variables) => {
      const key = queryKeyFactory.articles({ input: { archived: false } })
      const currentTodos = queryClient.getQueryData<Query>(key)
      if (currentTodos) {
        queryClient.setQueryData(key, (oldData: Query | undefined) => {
          return {
            articles: oldData?.articles.filter((article: Article) => {
              return article.id !== variables.input.id
            }),
          } as any
        })
      }
    },
  })
}
