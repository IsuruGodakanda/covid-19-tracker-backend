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
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
