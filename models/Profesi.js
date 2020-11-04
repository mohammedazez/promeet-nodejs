const mongoose = require('mongoose');

const profesiSchema = new mongoose.Schema({
    nameProfesi : {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    profileId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles'
    }]
});

const Profesi = mongoose.model('professions', profesiSchema);

module.exports = {Profesi};