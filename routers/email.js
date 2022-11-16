const emailController = require("../controllers/emailcontroller");

const router = require("express").Router();

router.post("/sendeMail", emailController.sendMail);

module.exports = router;
