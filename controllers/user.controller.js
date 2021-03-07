const { validateEditProfile, validateUserId } = require("../validations/user.validation");
const { MSG_TYPES } = require("../constants/msgTypes");
const UserService = require("../services/user.service");
const userInstance = new UserService();

exports.getUser = async (userId) => {
  try {
    const { error } = validateUserId(userId);
    if (error) throw new Error(error.details[0].message);

    const user = await userInstance.getUsers({ _id: userId.userId, verified: true, deleted: false })
    return user[0];

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

exports.getUsers = async () => {
  try {
    const users = await userInstance.getUsers({ verified: true, deleted: false })

    console.log('users', users)
    return users;

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

exports.getTagUsers = async (tagId) => {
  try {
    const users = await userInstance.getTagUsers(tagId)
    return users;

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

exports.editUser = async (user, editUserObject) => {
  try {
    const { error } = validateEditProfile(editUserObject);
    if (error) throw new Error(error.details[0].message);

    const updatedUser = await userInstance.editUser(user, editUserObject)
    return updatedUser;

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}

exports.deleteUser = async (userId) => {
  try {
    const { error } = validateUserId(userId);
    if (error) throw new Error(error.details[0].message);

    await userInstance.deleteUser(userId.userId)
    return { code: 200, message: MSG_TYPES.DELETED };

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}