const graphql = require('graphql');
const { GraphQLID, GraphQLList } = graphql

const { TagType } = require("../types/tag.type")

exports.tag = {
  type: TagType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return _.find(tags, { id: args.id });
  }
}

exports.tags = {
  type: GraphQLList(TagType),
  resolve(parent, args) {
    return tags;
  }
}