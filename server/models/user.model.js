let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6, maxlength: 25, required: true },
    confirmPassword: { type: String, minlength: 6, maxlength: 25, required: true }
});

module.exports = mongoose.model('user', userSchema);