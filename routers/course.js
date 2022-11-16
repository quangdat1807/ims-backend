const express = require("express");
const router = express.Router();
const {getList, details, create, del, update} = require("../controllers/courseController");

router.get("/internshipcourse/", getList);
router.get("/internshipcourse/:id", details);
router.post("/internshipcourse/create", create);
router.put("/internshipcourse/:id", update);
router.delete("/internshipcourse/:id", del);

module.exports = router;
