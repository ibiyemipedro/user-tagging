const { jsonResponse } = require("../utils/jsonResponse");

const TagService = require("../services/tag.service");
const tagInstance = new TagService();


/**
 * Create tag
 * @param {Object} tagObject
 * @returns {Object} response
 */
exports.createTag = async (tagObject) => {
  try {
    const createdTag = await tagInstance.createTag(tagObject)
    return createdTag;
  } catch (error) {
    return jsonResponse(400, 'Error creating tag', error)
  }
}