const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

router.get("/mentor", mentorController.get);
router.get("/mentor/idDG", mentorController.getiddg);
router.get("/mentor/:id", mentorController.detail);
router.delete("/mentor/:id", mentorController.remove);
router.get("/mentor/batch/:id", mentorController.detailBatch);
router.post("/mentor", mentorController.create);
router.put("/mentor/:id", mentorController.update);

module.exports = router;
