const config = require('config');
const bcrypt = require('bcrypt');
const { User } = require('../models');

class UserService {

  /**
  * Get a user
  * @param {Object} filter - filter criteria object
  * @param {Object} option - options to display
  * @param {String} populate - fields to populate
  * @returns {String} registeredUser
  */
  getUser(filter = {}, option = {}, populate = "") {
    return new Promise(async (resolve, reject) => {
      try {
        const registeredUser = await User.findOne(filter)
          .select(option)
          .populate(populate);

        if (!registeredUser || registeredUser.deleted) return reject({ code: 400, msg: 'User not found' })
        if (!registeredUser.verified) return reject({ code: 400, msg: 'User not verified' })
        delete registeredUser.password

        resolve(registeredUser);

      } catch (error) {
        error.source = 'Get user service'
        return reject(error);
      }
    })
  }

  /**
  * Edit a user
  * @param {Object} user - user object to be edited
  * @param {Object} body - edit object
  * @returns {Object} updatedUser
  */
  editUser(user, body) {
    return new Promise(async (resolve, reject) => {
      try {

        let validUser = await User.findOne({ email: user.email });
        if (!validUser || validUser.deleted) return reject({ code: 404, msg: 'User not found' })

        const updatedUser = await validUser.updateOne(body);
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Edit user service'
        return reject(error);
      }
    })
  }

  /**
  * Delete a user
  * @param {Object} user - user object to be deleted
  * @returns {Object} updatedUser
  */
  deleteUser(user) {
    return new Promise(async (resolve, reject) => {
      try {

        let validUser = await User.findOne({ email: user.email });
        if (!validUser || validUser.deleted) return reject({ code: 404, msg: 'User not found or Already Deleted' })

        const updatedUser = await validUser.updateOne({ deleted: true, deletedAt: new Date() });
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Delete user service'
        return reject(error);
      }
    })
  }

  /**
  * Change user password
  * @param {Object} user - user object to be edited
  * @param {Object} body - password update object
  * @returns {Object} updatedUser
  */
  changePassword(user, body) {
    return new Promise(async (resolve, reject) => {
      try {
        let validUser = await User.findOne({ email: user.email });
        if (!validUser || validUser.deleted) return reject({ code: 404, msg: 'User not found' })

        const isEqual = await bcrypt.compare(body.oldPassword, validUser.password);
        if (!isEqual) return reject({ code: 400, msg: 'Old password incorrect' })

        const hashedPassword = await bcrypt.hash(body.newPassword, config.get('application.jwt.salt'));

        const updatedUser = await validUser.updateOne({ password: hashedPassword });
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Change password service'
        return reject(error);

      }
    })
  }

}

module.exports = UserService