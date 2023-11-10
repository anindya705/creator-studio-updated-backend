const RequestHandler = require("../../utils/RequestHandler");
const UsersBaseController = require("./UserBaseController");
const Logger = require("../../utils/logger");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class UsersController extends UsersBaseController {
  static async getUserDetails(req, res) {
    try {
      const result = await super.getUserDetail();
      return requestHandler.sendSuccess(
        res,
        "User details fetched successfully"
      )({ result });
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }
}

module.exports = UsersController;
