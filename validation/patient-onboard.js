const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePatientOnboardInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.nic = !isEmpty(data.nic) ? data.nic : '';
  data.age = !isEmpty(data.age) ? data.age : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.medical_history = !isEmpty(data.medical_history) ? data.medical_history : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.district = !isEmpty(data.district) ? data.district : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.nic) || !/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(data.nic)) {
    errors.nic = 'Valid national ID field is required: eg:123456789V';
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = 'Age field is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.medical_history = 'Medical history field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }

  if (Validator.isEmpty(data.district)) {
    errors.district = 'District field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
