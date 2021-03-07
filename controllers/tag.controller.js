const { validateTag, validateTagId } = require("../validations/tag.validation");
const { MSG_TYPES } = require("../constants/msgTypes");
const TagService = require("../services/tag.service");
const tagInstance = new TagService();


/**
 * Create tag
 * @param {Object} tagObject
 * @returns {Object} response
 */
exports.createTag = async (tagObject) => {
  try {
    const { error } = validateTag(tagObject);
    if (error) throw new Error(error.details[0].message);

    const createdTag = await tagInstance.createTag(tagObject)
    return createdTag;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

/**
 * Edit tag
 * @param {Object} tagUpdateObject
 * @returns {Object} response
 */
exports.editTag = async (tagUpdateObject) => {
  try {
    const { error } = validateTag(tagUpdateObject);
    if (error) throw new Error(error.details[0].message);

    const tagId = tagUpdateObject.id;
    delete tagUpdateObject.id;

    const modifiedTag = await tagInstance.editTag(tagId, tagUpdateObject)
    return modifiedTag;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

/**
 * Delete tag
 * @param {Object} tagUpdateObject
 * @returns {Object} response
 */
exports.deleteTag = async (tagId) => {
  try {
    const { error } = validateTagId(tagId);
    if (error) throw new Error(error.details[0].message);

    await tagInstance.deleteTag(tagId.tagId)
    return { code: 200, message: MSG_TYPES.DELETED };

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}