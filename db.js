const connectDB = async (mongoose, mongoURL) => {
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