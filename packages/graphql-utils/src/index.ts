export const gql = (_: TemplateStringsArray) => {
  throw new Error(
    `[graphql-utils]: Depreciation notice: the gql function should be imported from @faststore-b2b/core. Follow this migration guide: faststore.dev/docs/api-extensions/api-extensions-improvements`
  )
}
