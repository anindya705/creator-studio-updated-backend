const RequestHandler = require("../utils/RequestHandler");
const Logger = require("../utils/logger");
const { Instagram } = require("../models");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class InstagramController {
  static async getAllInstagramData(req, res) {
    try {
      const result = await Instagram.find({});
      return requestHandler.sendSuccess(
        res,
        "Instagram details fetched successfully"
      )({ result });
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }

  static async getSingleInstagramData(req, res) {
    try {
      const { id } = req.query;
      const result = await Instagram.findById(id);
      return requestHandler.sendSuccess(
        res,
        "Instagram details for an id fetched successfully"
      )({ result });
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }

  static async createSingleInstagramData(req, res) {
    try {
      const { name, data } = req.body;
      const instagramCreated = new Instagram({
        name,
        data,
      });
      await instagramCreated.save();
      return requestHandler.sendSuccess(
        res,
        "Instagram details added successfully"
      )({ result: instagramCreated });
    } catch (err) {
      return requestHandler.sendError(req, res, err);
    }
  }
}

module.exports = InstagramController;
