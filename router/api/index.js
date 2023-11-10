const router = require("express").Router();

router.use("/user", require("./usersRouter"));
router.use("/instagram", require("./instaRouter"));

module.exports = router;