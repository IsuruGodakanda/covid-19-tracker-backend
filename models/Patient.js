const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nic: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  medical_history: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
