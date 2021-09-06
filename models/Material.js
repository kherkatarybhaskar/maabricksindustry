const mongoose =  require('mongoose');

const materialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    vehicleplateno: {
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
    materialname: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    uploaddate: {
        type: String
    },
    uploadtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = Material = mongoose.model('material', materialSchema);