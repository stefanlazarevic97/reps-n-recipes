const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exercisechema = new Schema({
    workout: {
        type: String,
        required: true
    },
    workoutQuantity: {
        type: Number
    },
    workoutWeight: {
        type: Number
    },
    workoutType: {
        type: String,
        required: true
    },
    workoutMuscleGroup: {
        type: String,
        required: true
    },
    datePerformed: {
        type: Date,
        required: true
    },
    performer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exercise', exercisechema);