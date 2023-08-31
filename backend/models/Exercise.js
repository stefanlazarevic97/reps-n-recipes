const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

    name: {type: String, required: true},

    muscleGroup: {
        type: String,
        enum: ['chest', 'back', 'shoulders', 'bicep', 'tricep', 'quad', 'hamstring', 'glute', 'calf', 'core'],
    },
  
    gif: {
        type: String, 
        required: false
    }
  
});

module.exports = mongoose.model('Exercise', exerciseSchema);