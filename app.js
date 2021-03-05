require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { mongoConnection } = require('./config/dbConfig');

const User = require('./models/user.model')

const PORT = process.env.PORT || 6000

const schema = require('./graphql/schema/schema')
const root = { hello: () => 'Hello world!' };

const app = express();

// graphlql endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// connection to DB
(async () => {
  try {
    await mongoConnection();
    app.listen(PORT, async () => {
      console.log(`Server started on port: ${PORT}`)
      console.log(`Now graphQL endpoint on localhost:${PORT}/graphql`)
    });

  } catch (error) {
    console.log('Mongo connection error', error)
  }
})()
