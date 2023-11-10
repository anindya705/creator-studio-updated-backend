const _ = require("lodash");
const RequestHandler = require("../../utils/RequestHandler");
const Logger = require("../../utils/logger");
const { User } = require("../../models");

const logger = new Logger();

class UsersBaseController {
  constructor(options) {
    this.limit = 20;
    this.options = options;
  }

  /**
   * Get an element by it's id .
   *
   *
   * @return a Promise
   * @return an err if an error occur
   */

  static async getUser(options) {
    let result;
    try {
      result = await User.findOne(options).lean();
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async getUserNoLean(options) {
    let result;
    try {
      result = await User.findOne(options);
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async getUserByIdForEntitiesApi(id) {
    let result;
    try {
      result = await User.findById(id);
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async getUserByEmail(email) {
    let result;
    try {
      result = await User.findOne({ email });
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async findUsersByEmails(emails = []) {
    let result;
    try {
      result = await User.find({ email: { $in: emails } }).lean();
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async createUser(req, data) {
    let obj = data;
    if (_.isUndefined(obj)) {
      obj = req.body;
    }
    let result;
    try {
      result = new User({ ...obj, is2FaEnabled: true });
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static createRole(data) {
    let result;
    try {
      result = new Role(data);
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async updateById(req, data) {
    const recordID = req.params.id;
    let result;
    try {
      result = await User.findOneAndUpdate(
        { id: recordID },
        { $set: data },
        { new: true }
      );
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async updateUserById(query, data) {
    let result;
    try {
      result = await User.findOneAndUpdate(
        query,
        { $set: data },
        { new: true }
      );
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static async getUserDetail(query) {
    let result;
    try {
      result = await User.findOne({});
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  static createUserForXlsx(data) {
    let obj = data;
    let result;
    try {
      result = new User({ ...obj, is2FaEnabled: true });
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }
}
module.exports = UsersBaseController;
