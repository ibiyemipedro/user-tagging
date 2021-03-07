const config = require('config');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const TagService = require("../services/tag.service");
const tagInstance = new TagService();

class UserService {

  /**
  * Get a user
  * @param {Object} filter - filter criteria object
  * @param {Object} option - options to display
  * @param {String} populate - fields to populate
  * @returns {String} registeredUser
  */
  getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      try {

        const registeredUser = await User.findById(userId);

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
* Get a user
* @param {Object} filter - filter criteria object
* @param {Object} option - options to display
* @param {String} populate - fields to populate
* @returns {String} registeredUser
*/
  getUsers(filter = {}, option = {}, populate = "") {
    return new Promise(async (resolve, reject) => {
      try {

        const registeredUser = await User.find(filter)
          .select(option)
          .populate(populate);

        if (!registeredUser || registeredUser.deleted) return reject({ code: 400, msg: 'User not found' })
        if (registeredUser.verified === false) return reject({ code: 400, msg: 'User not verified' })
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
  * @param {Object} userEditObject - edit object
  * @returns {Object} updatedUser
  */
  editUser(user, userEditObject) {

    return new Promise(async (resolve, reject) => {
      try {

        let validUser = await User.findOne({ email: user.email });
        if (!validUser || validUser.deleted) return reject({ code: 404, msg: 'User not found' })

        if (userEditObject.tag && userEditObject.tag.length > 0) {
          await Promise.all(userEditObject.tag.map(async (tag) => {
            await tagInstance.getTags({ _id: tag })
          }));
        }

        await validUser.updateOne(userEditObject);
        const updatedUser = await this.getUsers({ email: user.email })

        resolve(updatedUser[0]);

      } catch (error) {
        error.source = 'Edit user service'
        return reject(error);
      }
    })
  }

  /**
  * Delete a user
  * @param {String} userId - user to be deleted
  * @returns {Object} updatedUser
  */
  deleteUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {

        let validUser = await User.findById(userId);
        if (!validUser || validUser.deleted) return reject({ code: 404, msg: 'User not found or Already Deleted' })

        const updatedUser = await validUser.updateOne({ deleted: true, deletedAt: new Date() });
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Delete user service'
        return reject(error);
      }
    })
  }

}

module.exports = UserService