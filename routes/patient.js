const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { createPatient, getPatient } = require("../controllers/patient");

//params
router.param("userId", getUserById);

//actual routes
//create
router.post(
  "/patient/create/:userId",
  isSignedIn,
  isAuthenticated,
  createPatient
);

//read
router.get("/patient/:patientId", getPatient);

module.exports = router;
