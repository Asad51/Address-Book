let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    nickName: { type: String },
    phone: { type: Array },
    address: {
        city: { type: String },
        district: { type: String },
        zipCode: { type: Number }
    },
    website: { type: String },
    birthDate: { type: Date }
});

module.exports = mongoose.model('contact', contactSchema);