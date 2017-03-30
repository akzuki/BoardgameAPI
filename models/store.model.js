const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    boardgames: [{
        type: Schema.Types.ObjectId,
        ref: 'Boardgame'
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Store', StoreSchema);
