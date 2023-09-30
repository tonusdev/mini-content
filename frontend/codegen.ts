import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:8000/graphql',
  generates: {
    './services/gql/index.d.ts': {
      plugins: ['typescript']
    }
  }
}
export default config
