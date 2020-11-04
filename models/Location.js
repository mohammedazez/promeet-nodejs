const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    nameLocation : {
        type: String,
        required: true
    },
    professionalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userId'
    }
})