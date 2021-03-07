const graphql = require('graphql');
const { GraphQLObjectType } = graphql

// Mutations
const { signUp, adminSignUp, signIn, verifyAdmin } = require("./mutations/auth.mutations")
const { addTag, editTag, deleteTag } = require("./mutations/tag.mutation")

exports.mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //Auth
    signUp,
    adminSignUp,
    signIn,
    verifyAdmin,
    // Tag
    addTag,
    editTag,
    deleteTag
  }
})