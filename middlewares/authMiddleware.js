const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("../config/appconfig");
const RequestHandler = require("../utils/RequestHandler");
const Logger = require("../utils/logger");
const {
  getUserByIdForEntitiesApi,
  getUserByEmail
} = require("../controllers/user/UserBaseController");

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

function verifyToken(req, res, next) {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }
    const Bearer = req.headers.authorization.split(" ")[0];

    if (!Bearer || Bearer !== "Bearer") {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }

    // verifies secret and checks exp
    jwt.verify(token, config.auth.jwt_secret, async (err, decoded) => {
      if (err) {
        return requestHandler.sendCustomError(
          req,
          res,
          "Unauthorized",
          401
        )({});
      }
      const { payload = {} } = decoded || {};
      const { _id: id } = payload || {};
      const user = await getUserByIdForEntitiesApi(id);
      req.user = user;

      // const entityRole = await getEntitiesWithRole(
      //   req.headers["x-entity-role"]
      // );
      // req.entityRole = entityRole;

      next();
    });
  } catch (err) {
    return requestHandler.sendError(req, res, err);
  }
}

function resetPasswordToken(req, res, next) {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }
    const Bearer = req.headers.authorization.split(" ")[0];

    if (!Bearer || Bearer !== "Bearer") {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return requestHandler.sendCustomError(req, res, "Unauthorized", 401)({});
    }

    // verifies secret and checks exp
    jwt.verify(token, config.auth.jwt_secret, async (err, decoded) => {
      if (err) {
        return requestHandler.sendCustomError(
          req,
          res,
          "Unauthorized",
          401
        )({});
      }
      const { email } = decoded || {};
      const user = await getUserByEmail(email);
      req.user = user;
      next();
    });
  } catch (err) {
    return requestHandler.sendError(req, res, err);
  }
}

module.exports = {
  getJwtToken: getTokenFromHeader,
  isAuthunticated: verifyToken,
  resetPasswordAuth: resetPasswordToken
};
