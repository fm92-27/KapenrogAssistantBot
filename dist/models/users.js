const { mongoose } = require('../../dependencies.js');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    username: String,
    chatId: { type: Number, required: true },
    hasStarted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);