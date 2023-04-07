const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
   
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 

});

module.exports = mongoose.model('Patient', patientSchema)