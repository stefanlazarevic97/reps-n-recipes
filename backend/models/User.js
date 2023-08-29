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
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);