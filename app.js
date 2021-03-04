require('dotenv').config()

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const PORT = process.env.PORT || 4444


const schema = require('./graphql/schema/schema')
const root = { hello: () => 'Hello world!' };

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`));