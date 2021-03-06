const graphql = require('graphql');
const { GraphQLObjectType } = graphql

// Mutations
const { addUser } = require("./mutations/auth.mutations")
const { addTag } = require("./mutations/tag.mutation")

exports.mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
    addTag
  }
})