const mongoose = require('mongoose');

const profesiSchema = new mongoose.Schema({
    nameProfesi : {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const Profesi = mongoose.model('professions', profesiSchema);

module.exports = {Profesi};