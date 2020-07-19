import { ApolloServer } from 'apollo-server';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import typeDefs from './graphQL/schema';
import resolvers from './graphQL/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    cacheControl: {
        defaultMaxAge: 1000,
    },
    cors: {
        origin: '*'
    },
    playground: true,
    plugins: [responseCachePlugin()],
    context: ({ req, res }) => ({ req, res })
});

export default server;
