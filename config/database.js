require('dotenv').config();
const mongoose = require('mongoose');
const connectEnv = process.env.DB_PROMEET;

mongoose.connect(connectEnv, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbPromeet = mongoose.connection;
module.exports = dbPromeet;

