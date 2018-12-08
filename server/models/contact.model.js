let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    nickName: { type: String },
    email: { type: String },
    phones: { type: Array },
    address: {
        city: { type: String },
        district: { type: String },
        zipCode: { type: Number }
    },
    website: { type: String },
    birthDate: { type: Date },
    imagePath: { type: String, default: "/assets/images/user-profile.png" }
});

module.exports = mongoose.model('contact', contactSchema);