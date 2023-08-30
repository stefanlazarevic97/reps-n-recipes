const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    title: { type: String, required: true },

    description: { type: String }, 

    datePerformed: { type: Date, default: Date.now },

    workoutType: { 
        type: String, 
        enum: ['strength', 'cardio', 'HIIT'] 
    },

    duration: { type: Number, min: 0 },

    performer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    sets: [{
      exercise: {
        name: String,
        muscleGroup: String
      },
      repetitions: Number,
      weight: Number
    }]
    
  }, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);