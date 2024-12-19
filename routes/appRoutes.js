const express = require("express");
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/appController");

const router = express.Router();

router.get("/get", getApplications);
router.get("/get/:id", getApplication);
router.post("/create", createApplication);
router.post("/update/:id", updateApplication);
router.delete("/delete/:id", deleteApplication);

module.exports = router;
