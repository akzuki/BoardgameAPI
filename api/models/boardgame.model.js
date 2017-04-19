'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardgameSchema = new Schema({
    photoUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'Card Game',
            'City Building',
            'Educational',
            'Racing',
            'Adventures'
        ]
    },
    player: {
        type: String
    },
    time: {
        type: String
    },
    ages: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }],
    featured: {
        type: Boolean,
        default: false
    }
});

BoardgameSchema.statics = {
    getAll() {
        return this.find();
    },
    create(boardgame) {
        return boardgame.save();
    }
};

module.exports = mongoose.model('Boardgame', BoardgameSchema);
