const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

const printMessage = (message) => {
    console.log('Got message: ' + message);
}

const schema = buildSchema(`
    type Query {
        message: String
    }

    type Mutation {
        printMessage(message: String): String
    }
`);

const rootValue = {
    message: 'hello world',
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

app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen(8080, () => console.log("Server started on port 8080"));
