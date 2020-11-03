const mongoose = require('mongoose');

const profesiSchema = new mongoose.Schema({
    nameProfesi : {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    professionalId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professionals'
    }]
});

const Profesi = mongoose.model('professions', profesiSchema);

module.exports = {Profesi};