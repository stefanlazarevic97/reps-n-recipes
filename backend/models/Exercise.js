const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

    name: {type: String, required: true},
  
    type: {
      type: String,
      enum: ['compound', 'isolation', 'accessory', 'cardio']
    },
  
    muscleGroup: {
      type: String,
      enum: ['chest', 'back', 'shoulders', 'legs', 'arms', 'core', 'full body']
    },
  
    workoutType: {
      type: String,
      enum: ['strength', 'cardio', 'hiit'] 
    },
  
    gif: {
      type: String, 
      required: false
    }
  
});

module.exports = mongoose.model('Exercise', exerciseSchema);