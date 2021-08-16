const mongoose =  require('mongoose');

const cookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    cookname: {
        type: String,
        required: true
    },
    quantitycooked: {
        type: Number,
        required: true
    },
    uploadtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = Cook = mongoose.model('cook', cookSchema);