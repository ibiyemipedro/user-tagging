const UserService = require("../services/user.service");
const userInstance = new UserService();
const { appLogger } = require('../middlewares/logger');

exports.getUser = async (req, res, next) => {
  try {
    JsonResponse(res, 200, 'Get profile success', req.user)
  } catch (error) {
    next(error)
  }
}

exports.editUser = async (req, res, next) => {
  try {
    await userInstance.editProfile(req.body, req.user)

    JsonResponse(res, 200, 'Edit profile success')
  } catch (error) {
    next(error)
  }
}

exports.changePassword = async (req, res, next) => {
  try {
    // const { error } = validatePasswordUpdated(req.body);
    // if (error) return JsonResponse(res, 400, error.details[0].message)

    await userInstance.changePassword(req.body, req.user)

    JsonResponse(res, 200, 'Change password success')
  } catch (error) {
    next(error)
  }
}