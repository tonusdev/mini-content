import { gql } from 'graphql-request'
import { graphqlClient } from '@/services/graphql/client'
import { Query, QueryArticlesArgs } from '@/@types/gql'
import { useQuery } from '@tanstack/react-query'
import { queryKeyFactory } from './keyFactory'

const ARTICLES_QUERY = gql`
  query ($input: ArticlesInput!) {
    articles(input: $input) {
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

export async function fetchArticles(args: QueryArticlesArgs) {
  return await graphqlClient.request<Query>(ARTICLES_QUERY, args)
}

export function useArticlesQuery(args: QueryArticlesArgs) {
  return useQuery<Query, unknown>({
    queryKey: queryKeyFactory.articles(args),
    queryFn: () => fetchArticles(args),
    gcTime: 0
  })
}
