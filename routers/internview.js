const express = require("express");
const router = express.Router();
const {get, del, updateInternviewResult,updateInsert} = require("../controllers/internviewController");

router.get("/internview/:id", get);
router.put("/internview/:id", updateInternviewResult);
router.put("/internview/updateInsert/:id", updateInsert);
router.delete("/internview/:id", del);
module.exports = router;