'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Boardgame',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
});

OrderSchema.statics = {
    create(order) {
        return order.save();
    }
};

module.exports = mongoose.model('Order', OrderSchema);
