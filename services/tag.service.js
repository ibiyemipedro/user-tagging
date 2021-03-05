const Tag = require('../models/tag.models');


class TagService {

  /**
   * Create a tag
   * @param tag - Object
   * @returns User - Object
  */
  createTag(tag) {
    return new Promise(async (resolve, reject) => {
      try {

        let existingTag = await Tag.findOne({ name: tag.name });
        if (existingTag) return reject({ code: 400, msg: 'Tag already exists.' })

        const createdTag = await Tag.create(tag);
        if (!createdTag) return reject({ code: 500, msg: 'Error occurred, tag was not created.' })

        resolve(createdTag);
      } catch (error) {
        error.source = 'Create tag service'
        return reject(error);
      }
    })
  }


  /**
 * Get a user
 * @param user - Object
 * @returns User - Object
*/
  editTag(tagId, tagUpdate) {
    return new Promise(async (resolve, reject) => {
      try {
        let validTag = await Tag.findById(tagId);



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
  getTags() {
    return new Promise(async (resolve, reject) => {
      try {
        const tags = await Tag.findAll();

        if (tags.length < 1) return reject({ code: 404, msg: 'Tags not found' })
        resolve(tags);

      } catch (error) {
        error.source = 'Get all tags'
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
  deleteTag(body, user) {
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



module.exports = TagService