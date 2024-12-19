const express = require("express");
const {
  getApplication,
  createApplication,
  updateApplication,
} = require("../controllers/appController");

const router = express.Router();

router.get("/get/:id", getApplication);
router.post("/create", createApplication);
router.post("/update/:id", updateApplication);

module.exports = router;
