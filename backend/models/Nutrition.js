const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    food: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    
    }
})