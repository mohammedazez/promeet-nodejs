const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nameService : {
        type: String,
        required: true
    }
});

const Service = mongoose.model('services', serviceSchema);
module.exports = {Service};
