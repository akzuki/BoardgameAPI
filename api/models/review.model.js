const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    boardgame: {
        type: Schema.Types.ObjectId,
        ref: 'Boardgame'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
