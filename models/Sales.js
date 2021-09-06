const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    typeofbrick: {
        type: String,
        required: true
    },
    drivername: {
        type: String,
        required: true
    },
    vehicletype: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vehicleno: {
        type: String,
        required: true
    },
    uploaddate: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sales = mongoose.model('sales', salesSchema);