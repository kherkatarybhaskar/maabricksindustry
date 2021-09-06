const mongoose =  require('mongoose');

const carrierSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    carriername: {
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

module.exports = Carrier = mongoose.model('carrier', carrierSchema);