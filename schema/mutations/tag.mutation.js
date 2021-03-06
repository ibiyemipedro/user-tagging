const graphql = require('graphql');
const { GraphQLString } = graphql
const { TagType } = require("../types/tag.type")
const { createTag } = require('../../controllers/tag.controller');

exports.addTag = {
  type: TagType,
  args: {
    name: { type: GraphQLString },
    details: { type: GraphQLString }
  },
  resolve(parent, args) {
    return createTag(args)
  }
}