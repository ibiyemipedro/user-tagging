const config = require('config');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { v4: uuidv4 } = require('uuid');


class UserService {

  /**
   * Get a user
   * @param user - Object
   * @returns User - Object
  */
  getProfile(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const registeredUser = await User.findOne({
          where: {
            email: user.email
          },
          raw: true,
        });
        if (!registeredUser) return reject({ code: 404, msg: 'User not found' })
        if (!registeredUser.verified) return reject({ code: 404, msg: 'User not verified' })
        if (registeredUser.status !== "ACTIVE") return reject({ code: 404, msg: 'User not Active' })
        delete registeredUser.password

        registeredUser.wallet = await walletInstance.getWallet(registeredUser.userId)
        resolve(registeredUser);

      } catch (error) {
        error.source = 'Get Profile Service'
        return reject(error);
      }
    })
  }

  /**
   * Edit a user
   * @param body - Object
   * @param user - Object
   * @returns updatedUser - Object
  */
  editProfile(body, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await User.update(body, {
          where: {
            email: user.email
          }
        });
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Edit Profile Service'
        return reject(error);
      }
    })
  }



  /**
   * Edit a user
   * @param body - Object
   * @param user - Object
   * @returns updatedUser - Object
  */
  changePassword(body, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const activeUser = await User.findOne({
          where: {
            email: user.email
          },
          raw: true,
        });
        const isEqual = await bcrypt.compare(body.oldPassword, activeUser.password);
        if (!isEqual) return reject({ code: 400, msg: 'Old password incorrect' })

        const hashedPassword = await bcrypt.hash(body.newPassword, config.get('application.jwt.salt'));

        const updatedUser = await User.update({ password: hashedPassword }, {
          where: {
            email: user.email
          }
        });
        resolve(updatedUser);

      } catch (error) {
        error.source = 'Change password service'
        return reject(error);

      }
    })
  }

}



module.exports = UserService