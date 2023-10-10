import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://127.0.0.1:3001/graphql',
  generates: {
    './@types/gql/index.d.ts': {
      plugins: ['typescript']
    },
  },
}
export default config
