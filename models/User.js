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
  locationId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locations'
  },
  profesiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'professions'
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles'
  },
  imgUrl :{
    type: String
  },  
  role : {
      type: String,
      // required: true,
      enum: ['member', 'profesional', 'admin'],
      default: 'member'
  }
});

const User = mongoose.model('users', userSchema);

module.exports = {User};
