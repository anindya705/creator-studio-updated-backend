const InstagramController = require("../../controllers/InstagramController");
const { isAuthunticated } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/all", InstagramController.getAllInstagramData);
router.get("/", InstagramController.getSingleInstagramData);
router.post("/", InstagramController.createSingleInstagramData);


module.exports = router;