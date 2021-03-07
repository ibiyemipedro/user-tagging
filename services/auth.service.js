const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user.model');
const { appLogger } = require('../utils/logger');

const UserService = require("./user.service");
const userInstance = new UserService();

class AuthService {

  /**
   * Create a user
   * @param {Object} body -sign up object
   * @returns {Object} user
  */
  signUp(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let existingUser = await User.findOne({ email: body.email });
        if (existingUser) return reject({ code: 400, msg: 'Email already used.' })

        const hashedPassword = await bcrypt.hash(body.password, config.get('application.jwt.salt'));
        body.password = hashedPassword;
        body.verified = true

        const result = await User.create(body);
        if (!result) return reject({ code: 500, msg: 'Error occurred, user was not created.' })
        delete result.password;

        resolve(result);
      } catch (error) {
        error.source = 'User sign up service'
        return reject(error);
      }
    })
  }

  /**
  * Create a admin
  * @param {Object} body - sign up object
  * @returns {Object} admin user
  */
  adminSignUp(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let existingUser = await User.findOne({ email: body.email });
        if (existingUser) return reject({ code: 400, msg: 'Email already used.' })


        if (body.userType.toUpperCase() === "CONTRACTOR") return reject({ code: 400, msg: 'A contractor cannot be an admin.' })

        const hashedPassword = await bcrypt.hash(body.password, config.get('application.jwt.salt'));
        body.password = hashedPassword;
        body.isAdmin = true
        const result = await User.create(body);

        if (!result) return reject({ code: 500, msg: 'Error occurred, user was not created.' })
        delete result.password;

        resolve(result);
      } catch (error) {
        error.source = 'Admin sign up service'
        return reject(error);
      }
    })
  }

  /**
  * Authenticates a user/sign in
  * @param {Object} body - login credentials
  * @returns {Object} {user, token}
  */
  signIn(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ email: body.email });

        if (!user || user.deleted) return reject({ code: 404, msg: 'User not found' })
        if (!user.verified) return reject({ code: 400, msg: 'User(Admin) not verified' })

        const isEqual = await bcrypt.compare(body.password, user.password);
        if (!isEqual) return reject({ code: 400, msg: 'Password incorrect' })

        delete user.password

        const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, config.get('application.jwt.key'), {
          expiresIn: '3d'
        });

        if (!token) return reject({ code: 400, msg: 'Could not sign user' })

        resolve({ user, token });

      } catch (error) {
        error.source = 'Sign In Service'
        return reject(error);

      }
    }
    )
  }


  /**
  * Verify admin 
  * @param {Object} body - verification object
  * @returns {Object} updatedAdmin
  */

  verifyAdmin(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({ email: body.email });

        if (!user || user.deleted) return reject({ code: 404, msg: 'Admin not found' })
        if (!user.isAdmin) return reject({ code: 400, msg: 'Account not an admin' })
        if (user.verified) return reject({ code: 400, msg: 'Account already verified' })

        // For demo purposes verification code is CODELITT, usually this should be a One Time Password to phone number or email
        if (body.verificationCode !== "CODELITT") return reject({ code: 400, msg: ' Code incorrect, Could not verify admin' })

        await user.updateOne({
          verified: true
        })

        const updatedAdmin = await userInstance.getUser({ email: body.email })

        resolve(updatedAdmin);

      } catch (error) {
        error.source = 'verify admin service'
        return reject(error);

      }
    }
    )
  }
}

module.exports = AuthService