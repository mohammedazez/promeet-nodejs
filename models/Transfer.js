const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    nameMethod: {
        type: String,
        required: true
    },
    numberRek : {
        type: String,
        required: true
    }
});

const Transfer = new mongoose.model('transfers', transferSchema);
module.exports = {Transfer};