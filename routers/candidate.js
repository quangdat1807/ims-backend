const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
router.put("/candidate/interview/:id", candidateController.update);

router.get("/candidate/:id", candidateController.getCandidate);
router.get("/candidate/batch/:id", candidateController.getBatch);
router.put("/candidate/:id", candidateController.updateCandidate);
router.delete("/candidate/:id", candidateController.remove);
router.post("/candidate/create", candidateController.create);


module.exports = router;
