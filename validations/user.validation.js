const Joi = require("joi");

function validateUser(user) {
  const Schema = Joi.object().keys({
    email: Joi.string().email().max(50).required(),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    userType: Joi.string().valid("employee", "contractor").required(),
    tag: Joi.string().optional(),
    password: Joi.string().min(7).required(),
  });

  return Schema.validate(user);
}

function validateLogin(user) {
  const Schema = Joi.object().keys({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(7).required(),
  });

  return Schema.validate(user);
}

function validateEditProfile(user) {
  const Schema = Joi.object().keys({

  });

  return Schema.validate(user);
}

function validateAdminVerification(verificationObject) {
  const Schema = Joi.object().keys({
    email: Joi.string().email().max(50).required(),
    verificationCode: Joi.string().min(4).max(15).required(),
  });

  return Schema.validate(verificationObject);
}

function validatePasswordUpdated(user) {
  const Schema = Joi.object().keys({
    oldPassword: Joi.string().min(7).required(),
    newPassword: Joi.string().min(7).required(),
  });

  return Schema.validate(user);
}

function validateVerify(user) {
  const Schema = Joi.object().keys({
    type: Joi.string().valid("user", "admin").optional(),
  });

  return Schema.validate(user);
}



module.exports = {
  validateUser,
  validateLogin,
  validateAdminVerification,


  validateEditProfile,
  validatePasswordUpdated,
  validateVerify
};
