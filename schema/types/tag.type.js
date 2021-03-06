const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql


const { UserType } = require("./user.type")

exports.TagType = new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: GraphQLList(UserType), resolve(parent, args) {
        return _.filter(users, { tag: parent.id });
      }
    }
  })
})