const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
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
  phoneNumber: {
      type: String,
      required: true
  },
  dob: {
    type: Date,
  },
  address: {
      type: String,
  },
  role : {
      type: String,
      enum: ['member', 'profesional'],
      default: 'member'
  }
});

const Member = mongoose.model('members', memberSchema);

module.exports = {Member};
