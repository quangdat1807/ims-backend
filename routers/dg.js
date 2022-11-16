const express = require("express");
const router = express.Router();
const dgController = require("../controllers/dgController");

router.get("/dg/", dgController.getList);
router.post("/dg/create", dgController.create);
router.put("/dg/:id", dgController.update);
router.delete("/dg/:id", dgController.remove);

module.exports = router;
