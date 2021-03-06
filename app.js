require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { mongoConnection } = require('./config/dbConfig');
const { loggerMiddleware } = require("./utils/logger")

const PORT = process.env.PORT || 5000

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

const schema = require('./schema/index')
const root = { hello: () => 'Hello world!' };

const app = express();

app.use(cors);

// app.use(loggerMiddleware);

// graphlql endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));


// Default landing endpoint
app.use('/', (req, res, next) => res.status(200).json({ message: 'Welcome to CODE-LITTTT.' }));

// connection to DB and running server
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