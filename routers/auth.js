const router = require("express").Router();
const {login, profile} = require("../controllers/authController");
const {requireToken} = require("../middleware/index")

router.post("/auth/login", login);
router.get("/auth/profile", requireToken, profile);

module.exports = router;