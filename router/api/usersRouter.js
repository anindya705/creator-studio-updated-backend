const UsersController = require("../../controllers/user/UserController");
const { isAuthunticated } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/details", UsersController.getUserDetails);


module.exports = router;