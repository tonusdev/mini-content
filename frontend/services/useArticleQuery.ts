import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { Query, QueryArticleArgs } from '@/@types/gql'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from './keyFactory'

const ARTICLE_QUERY = gql`
  query ($input: ArticleInput!) {
    article(input: $input) {
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

export async function fetchArticle(args: QueryArticleArgs) {
  return await graphqlClient.request<Query, QueryArticleArgs>(ARTICLE_QUERY, args)
}

export function useArticleQuery(args: QueryArticleArgs) {
  return useQuery<Query, unknown>({
    queryKey: queryKeyFactory.article(args),
    queryFn: () => fetchArticle(args),
    gcTime: 0
  })
}
