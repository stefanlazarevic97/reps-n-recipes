const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    food: {
        type: String,
        required: true
    },
    foodQuantity: {
        type: Number,
        required: true
    },
    foodQuantityUnit: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    gramsCarbs: {
        type: Number,
        required: true
    },
    gramsFat: {
        type: Number,
        required: true
    },
    gramsProtein: {
        type: Number,
        required: true
    },
    dateConsumed: {
        type: Date,
        required: true
    },
    consumer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);