const graphql = require('graphql');
const { GraphQLString } = graphql
const { UserType } = require("../types/user.type")
const { createUser } = require('../../controllers/auth.controller');

exports.addUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tag: { type: GraphQLString },
    userType: { type: GraphQLString },
  },
  resolve(parent, args) {
    return createUser(args)
  }
}

