module.exports = {
  client: {
    includes: ['./**/*.graphql'],
    service: {
      name: 'client',
      localSchemaFile: 'packages/server/schema.gql'
    }
  }
};
