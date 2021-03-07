const { validateEditProfile, validateUserId } = require("../validations/user.validation");
const { MSG_TYPES } = require("../constants/msgTypes");
const UserService = require("../services/user.service");
const userInstance = new UserService();

exports.getUser = async () => {
  try {

    const user = await userInstance.getUser()
    return user;

  } catch (error) {
    next(error)
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