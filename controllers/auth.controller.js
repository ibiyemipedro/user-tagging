const { validateUser, validateLogin, validateVerify } = require("../validations/user.validation");
const AuthService = require("../services/auth.service");
const authInstance = new AuthService();


/**
 * Create user
 * @param {Object} userObject
 * @returns {Object} response
 */
exports.createUser = async (userObject) => {
  try {

    const { error } = validateUser(userObject);
    if (error) throw new Error(error.details[0].message);

    const createdUser = await authInstance.signUp(userObject)
    return createdUser;

  } catch (error) {
    throw new Error(error.msg || error.message);
  }
}