const { mongoose, mongoURL } = require('./dependencies.js');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;