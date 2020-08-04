const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createPatient,
  getPatient,
  updatePatient,
} = require("../controllers/patient");

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

//update
router.put(
  "/patient/:patientId/status/:userId",
  isSignedIn,
  isAuthenticated,
  updatePatient
);

module.exports = router;
