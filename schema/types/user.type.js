const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

exports.UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    tag: { type: GraphQLString },
    userType: { type: GraphQLString },
    password: { type: GraphQLString },
  })
})