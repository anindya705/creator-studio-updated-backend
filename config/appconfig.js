require("dotenv").config();

// config.js
module.exports = {
  app: {
    port: process.env.DEV_APP_PORT || 2020,
    appName: process.env.APP_NAME || "vlogmi",
    env: process.env.NODE_ENV || "development",
  },
  db: {
    url: process.env.MONGO_URL,
    db: process.env.MONGO_DATABASE,
    port: process.env.MONGO_PORT,
    mongoUser: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
  },
  winiston: {
    logpath: "/vlogmiLogs/logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1d",
    saltRounds: process.env.SALT_ROUND || 10,
    refresh_token_secret:
      process.env.REFRESH_TOKEN_SECRET || "VmVyeVBvd2VyZnVsbFNlY3JldA==",
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d", // 2 days
  },
  sendgrid: {
    api_key: process.env.SEND_GRID_API_KEY,
    api_user: process.env.USERNAME,
    from_email: process.env.FROM_EMAIL || "no-reply@vlogmi.ai",
  },
};
