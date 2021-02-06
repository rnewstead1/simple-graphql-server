const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Create a server:
const app = express();

const printMessage = (message) => {
    console.log('Got message: ' + message);
}

// Create a schema and a root resolver:
const schema = buildSchema(`
    type Book {
        title: String!
        author: String!
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        printMessage(message: String): String
    }
`);

const rootValue = {
    books: [
        {
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
        },
        {
            title: "The Wise Man's Fear",
            author: "Patrick Rothfuss",
        }
    ],
    printMessage: ({ message }) => {
        printMessage(message);
        return 'OK';
    }
};

app.use(cors({ origin: /.*localhost.*/, credentials: true }));
app.use((req, res, next) => {
    console.log(`Received request with method: ${req.method}`);
    next();
})

// Use those to handle incoming requests:
app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

// Start the server:
app.listen(8080, () => console.log("Server started on port 8080"));
