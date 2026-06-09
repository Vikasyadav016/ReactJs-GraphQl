const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { server: serverConfig } = require('./config/config');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: serverConfig.port },
    context: async ({ req }) => ({ req }),
  });

  console.log(`GraphQL server ready at ${url}`);
}

startServer().catch((error) => {
  console.error('Failed to start GraphQL server:', error);
  process.exit(1);
});
