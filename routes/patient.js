const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createPatient,
  getPatient,
  updatePatient,
  dischargePatient,
  getCapacity,
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

router.get("/capacity", getCapacity);

//update
router.put(
  "/patient/:patientId/status/:userId",
  isSignedIn,
  isAuthenticated,
  updatePatient
);

router.put(
  "/patient/:patientId/discharge/:userId",
  isSignedIn,
  isAuthenticated,
  dischargePatient
);

module.exports = router;
