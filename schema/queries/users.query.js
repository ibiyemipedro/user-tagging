const graphql = require('graphql');
const { GraphQLID, GraphQLList } = graphql

const { UserType } = require("../types/user.type")

exports.user = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return _.find(users, { id: args.id });
  }
}

exports.users = {
  type: GraphQLList(UserType),
  resolve(parent, args) {
    return users;
  }
}