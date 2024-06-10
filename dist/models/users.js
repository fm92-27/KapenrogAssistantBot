const { mongoose } = require('../../dependencies.js');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    username: String,
    chatId: { type: Number, required: true },
    hasStarted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = { User };