const router = require("express").Router();

router.use("/user", require("./usersRouter"));

module.exports = router;