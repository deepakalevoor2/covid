const Patient = require("../models/patient");

exports.createPatient = (req, res) => {
  //req.body.order.user = req.profile;
  const patient = new Patient(req.body);
  console.log(req.body);

  patient.save((err, patient) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "failed to save patient in DB" });
    }
    res.json(patient);
  });
};

exports.getPatient = (req, res) => {
  console.log(req.params.patientId);
  Patient.findOne({ patientId: req.params.patientId }).exec((err, patient) => {
    if (err) {
      return res.status(400).json({ error: "Paitent not found" });
    }
    res.json(patient);
  });
};
