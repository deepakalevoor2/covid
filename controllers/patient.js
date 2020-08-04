const Patient = require("../models/patient");
const patient = require("../models/patient");

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

exports.updatePatient = (req, res) => {
  const patient = req.body;
  console.log(patient);
  Patient.updateOne(
    { patientId: req.params.patientId },
    {
      $set: {
        patientName: patient.patientName,
        currentStatus: patient.currentStatus,
        bedNo: patient.bedNo,
        ventilator: patient.ventilator,
      },
    },
    (err, patient) => {
      if (err) {
        return res.status(400).json({ error: "Failed to update status" });
      }
      res.json(patient);
    }
  );
};

exports.dischargePatient = (req, res) => {
  const patient = req.body;
  console.log(patient);
  Patient.updateOne(
    { patientId: req.params.patientId },
    {
      $set: {
        discharged: patient.discharged,
      },
    },
    (err, patient) => {
      if (err) {
        return res.status(400).json({ error: "Failed to update status" });
      }
      res.json(patient);
    }
  );
};
