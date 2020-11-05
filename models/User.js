const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  numberPhone: {
      type: String,
      required: true
  },
  dob: {
    type: Date,
  },
  address: {
      type: String,
  },
  profesiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'professions'
  },  
  role : {
      type: String,
      // required: true,
      enum: ['member', 'profesional'],
      default: 'member'
  }
});

const User = mongoose.model('users', userSchema);

module.exports = {User};
