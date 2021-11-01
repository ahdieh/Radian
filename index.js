const { ApolloServer, gql } = require('apollo-server');
// Importing the PrismaClient constructor from the @prisma/client node module
const {PrismaClient} = require('@prisma/client');

// Instantiate PrismaClient
const prisma = new PrismaClient();

// GraphQL Schema
// A schema is a collection of type definitions (hence "typeDefs")
const typeDefs = gql`
    # this "User" type defines the queryable fields for every user in our data source 
    type User {
        userId: String
        password: String
    }
    
    # Query lists all the available queries that clients can execute
    # Operations for fetching data
    type Query {
        users: [User]
    }
    
    # Operations for updating data
    type Mutation {
    
    }
`;

const newUser = await prisma.user.create({
    data: {
        username: 'Alice',
        password: 'alice@prisma.io',
    },
})

const users = await prisma.user.findMany();

// Defining data set
// const users = [
//     {
//         userId: 'Ahdieh',
//         password: '123'
//     },
//     {
//         userId: 'Vinodh',
//         password: '456'
//     },
//     {
//         userId: 'Jaya',
//         password: '789'
//     }
// ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "books" array above.
const resolvers = {
    Query: {
        users: () => users,
    },
};

// The ApolloServer constructor requires two parameters:
// your schema definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
