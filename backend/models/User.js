const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nutritionSchema = require('./Nutrition');
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    nutrition: [nutritionSchema]
    },
    healthData: {
        mass: Number,
        height: Number,
        age: Number,
        sex: String,
        activityLevel: Number,
        TDEE: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);