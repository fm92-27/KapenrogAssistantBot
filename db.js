//const { mongoose, mongoURL } = require('./dependencies.js');
const mongoose = require('mongoose');

const connectDB = /*async*/ (mongoURL) => {
    /*try {
        await*/ mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })/*;
    } catch (err) {
        process.exit(1);
    }*/
    .then(() => console.log('MongoDB connection'))
    .catch(err => console.log(err));
};

module.exports = connectDB;