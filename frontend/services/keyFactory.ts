import { QueryArticleArgs, QueryArticlesArgs } from "@/@types/gql"

export const queryKeyFactory = {
  article: (args: QueryArticleArgs) => ['article', args],
  articles: (args: QueryArticlesArgs) => ['articles', args],
  user: () => ['user'],
}

export const mutationKeyFactory = {
  authenticate: () => ['authenticate'],
  createArticle: () => ['createArticle'],
  updateArticle: () => ['updateArticle'],
  archiveArticle: () => ['archiveArticle'],
}
