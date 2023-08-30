const mongoose = require("mongoose");
const { mongoURI: dbUri } = require('../config/keys');
const Exercise = require('../models/Exercise')

const seedDatabase = async () => {

  // Connect to MongoDB
  await mongoose.connect(dbUri); 
  
  // Seed data
    await Exercise.create({
        name: 'Bench Press',
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength'
    })
    await Exercise.create({
        name: 'Triceps Dip (Dumbbell)',
        type: 'isolation',
        muscleGroup: 'arms',
        workoutType: 'strength'
    })
    await Exercise.create({
        name: 'Bulgarian Split Squat',
        type: 'compound',
        muscleGroup: 'legs',
        workoutType: 'strength'
    })

    await Exercise.create({
        name: 'Squat',
        type: 'compound',
        muscleGroup: 'legs',
        workoutType: 'strength'
    });
      
    await Exercise.create({
        name: 'Deadlift',
        type: 'compound', 
        muscleGroup: 'back',
        workoutType: 'strength'
    });
    
    await Exercise.create({
        name: 'Bicep Curl',
        type: 'isolation',
        muscleGroup: 'arms',
        workoutType: 'strength' 
    });
    
    await Exercise.create({
        name: 'Lateral Raise',
        type: 'isolation',
        muscleGroup: 'shoulders',
        workoutType: 'strength'
    });
    
    await Exercise.create({
        name: 'Crunches',
        type: 'isolation',
        muscleGroup: 'core',
        workoutType: 'strength'
    });
    
    await Exercise.create({
        name: 'Push-ups',
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength' 
    });
    
    await Exercise.create({
        name: 'Pull-ups',
        type: 'compound',
        muscleGroup: 'back',
        workoutType: 'strength'
    });
      
    // Cardio
    
    await Exercise.create({
        name: 'Running',
        type: 'cardio',
        muscleGroup: 'legs',
        workoutType: 'cardio'  
    });
    
    await Exercise.create({
        name: 'Cycling',
        type: 'cardio',
        muscleGroup: 'legs',
        workoutType: 'cardio' 
    });
    
    await Exercise.create({
        name: 'Swimming',
        type: 'cardio',
        muscleGroup: 'full body',
        workoutType: 'cardio'
    });
    
    await Exercise.create({
        name: 'Rowing',
        type: 'cardio',
        muscleGroup: 'back',
        workoutType: 'cardio'
    });
      
    await Exercise.create({
        name: 'Jump Rope',
        type: 'cardio',
        muscleGroup: 'legs',
        workoutType: 'cardio'
    });



  // Disconnect
  await mongoose.disconnect();

}

seedDatabase();