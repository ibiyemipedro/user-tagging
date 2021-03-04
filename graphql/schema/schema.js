const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql
const _ = require('lodash');


let users = [
  { id: '1', name: 'Phil Pedro', type: 'Contractor', role: 'Full stack dev', tag: '1' },
  { id: '2', name: 'Foden Gray', type: 'Contractor', role: '', tag: '1' }
]


let tags = [
  { id: '1', name: 'CSS' },
  { id: '2', name: 'Go' },
  { id: '3', name: 'Django' }
]


const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    role: { type: GraphQLString },
    tag: {
      type: TagType, resolve(parent, args) {
        return _.find(tags, { id: parent.tag });
      }
    },
    contractDuration: { type: GraphQLString },
  })
})


const TagType = new GraphQLObjectType({
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


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(users, { id: args.id });
      }
    },
    tag: {
      type: TagType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(tags, { id: args.id });
      }
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    },
    tags: {
      type: GraphQLList(TagType),
      resolve(parent, args) {
        return tags;
      }
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})