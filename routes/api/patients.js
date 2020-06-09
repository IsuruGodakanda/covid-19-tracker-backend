const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const keys = require('../../config/keys');

// Load Input Validation
const validatePatientOnboardInput = require('../../validation/patient-onboard');

// Load Patient model
const Patient = require('../../models/Patient');

// @route   GET api/patients/test
// @desc    Tests patients route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Patients Works' }));

// @route   POST api/patients/onboard
// @desc    Onboard patient
// @access  Public
router.post('/onboard', (req, res) => {
  const { errors, isValid } = validatePatientOnboardInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Patient.findOne({ nic: req.body.nic }).then((patient) => {
    if (patient) {
      errors.nic = 'National ID already exists';
      return res.status(400).json(errors);
    } else {
      const newPatient = new Patient({
        name: req.body.name,
        nic: req.body.nic,
        gender: req.body.gender,
        age: req.body.age,
        medical_history: req.body.medical_history,
        address: req.body.address,
        district: req.body.district
      });

      let hash_address = CryptoJS.AES.encrypt(newPatient.address, keys.encryptionKey).toString();
      let hash_medical_history = CryptoJS.AES.encrypt(newPatient.medical_history, keys.encryptionKey).toString();
      newPatient.address = hash_address;
      newPatient.medical_history = hash_medical_history;
      newPatient
        .save()
        .then((patient) => res.json(patient))
        .catch((err) => console.log(err));
    }
  });
});

// @route   GET api/patients/all
// @desc    Get all patients
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Patient.find()
    .populate('patient', ['name', 'address'])
    .then((records) => {
      if (!records) {
        errors.noprofile = 'There are no records';
        return res.status(404).json(errors);
      }

      let obj = [];
      records.reverse().map((record) => {
        let originalAddress = CryptoJS.AES.decrypt(record.address, keys.encryptionKey).toString(CryptoJS.enc.Utf8);
        let originalMedicalHistory = CryptoJS.AES.decrypt(record.medical_history, keys.encryptionKey).toString(
          CryptoJS.enc.Utf8
        );
        obj.push({
          name: record.name,
          age: record.age,
          address: originalAddress,
          district: record.district,
          medical_history: originalMedicalHistory
        });
      });

      res.json(obj);
    })
    .catch((err) => res.status(404).json({ record: 'There are no records' }));
});

module.exports = router;
