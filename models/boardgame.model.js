const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardgameSchema = new Schema({
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
    imagePath: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

BoardgameSchema.statics = {
    getAll() {
        return this.find();
    },
    getById(id) {
        return this.findById(id).exec();
    }
};

module.exports = mongoose.model('Boardgame', BoardgameSchema);
