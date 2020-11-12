const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    nameLocation : {
        type: String,
        required: true
    },
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const Location = new mongoose.model('locations', locationSchema);
module.exports = {Location}