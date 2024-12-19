const Application = require("../models/Application");
const { getUserIdFromToken } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const getApplications = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid application ID",
    });
  }

  try {
    const applications = await Application.find({ user: userId }).populate(
      "user",
      "firstName lastName email phone address"
    );

    return res.status(200).json({
      message: "Applications data returned",
      applications: applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the users applications",
    });
  }
};

const getApplication = async (req, res) => {
  const applicationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return res.status(400).json({
      message: "Invalid application ID",
    });
  }

  try {
    const applicationWithUser = await Application.findById(
      applicationId
    ).populate("user", "firstName lastName email phone address");

    if (!applicationWithUser) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application found successfully",
      application: applicationWithUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving the application",
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const { applicationName, income, expenses, assets, liabilities } = req.body;
    const userId = getUserIdFromToken(req);

    const newApplication = new Application({
      name: applicationName,
      income,
      expenses,
      assets,
      liabilities,
      user: userId,
    });

    await newApplication.save();
    return res.status(201).json({
      message: "Application created successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error creating application:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateApplication = async (req, res) => {
  console.log("Update Application");
  console.log(req.body);
};

const deleteApplication = async (req, res) => {
  const applicationId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return res.status(400).json({
      message: "Invalid application ID",
    });
  }
  try {
    const applicationDeleted = await Application.findByIdAndDelete(
      applicationId
    );
    if (!applicationDeleted) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    return res.status(200).json({
      message: "Application deleted successfully",
      applicationDeleted: applicationDeleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the application",
    });
  }
};
module.exports = {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
