const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
   
  },
  emailAdress: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
 

});

module.exports = mongoose.model('Patient', patientSchema)