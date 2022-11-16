const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");

router.get("/internship", internshipController.get);
router.get("/internship/:id", internshipController.detail);
router.delete("/internship/:id", internshipController.remove);
router.get("/internship/batch/:id", internshipController.detailBatch);
router.post("/internship/:id", internshipController.create);
router.post("/internship/", internshipController.createInternship);
router.put("/internship/:id", internshipController.update);
router.put("/internship/", internshipController.updateStatus);

module.exports = router;
