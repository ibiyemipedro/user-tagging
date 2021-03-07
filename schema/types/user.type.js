const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = graphql

const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
    userType: { type: GraphQLString },
    password: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean }
  })
})


exports.AuthUserType = new GraphQLObjectType({
  name: 'AuthUser',
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

exports.UserType = UserType;