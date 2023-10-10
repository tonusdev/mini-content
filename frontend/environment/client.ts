export const getClientEnv = () => {
  return {
    graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  }
}
