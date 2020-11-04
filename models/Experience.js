const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema({
    nameExpert : {
        type: String,
        required: true
    },
    yearExpert: {
        type: Date
    },
    professionalId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'professionals'
    }
})