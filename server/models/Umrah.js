const mongoose = require('mongoose');

const UmrahSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    origin: {
        type: String,
        required: true,
        trim: true,
    },
    pax: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Umrah', UmrahSchema);
