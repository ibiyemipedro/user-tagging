const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql


const { UserType } = require("./user.type")

exports.TagType = new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    users: {
      type: GraphQLList(UserType), resolve(parent, args) {

      }
    }
  })
})