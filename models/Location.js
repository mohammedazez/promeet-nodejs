const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    nameCity: {
        type: String
    },
    nameLocation : {
        type: String,
       
    },
    detailLocation : {
        type: String
    },
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const Location = new mongoose.model('locations', locationSchema);
module.exports = {Location}