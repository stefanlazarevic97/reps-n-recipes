const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    title: { type: String, required: true },

    performer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    sets: []

}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);