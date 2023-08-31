const mongoose = require("mongoose");
const { mongoURI: dbUri } = require('../config/keys');
const Exercise = require('../models/Exercise')

const seedDatabase = async () => {

  // Connect to MongoDB
  await mongoose.connect(dbUri); 

  Exercise.collection.drop()
    //   "/Users/apple/Documents/AppAcademy/health-360/backend/assets/workoutGifs/Barbell Bent Over Row.gif"

    const assets = ["Barbell Bench Press", "Dumbbell Incline Bench Press", "Barbell Bent Over Row",
    "Dumbbell Bench Press", "Dumbbell Bent over Row", "Barbell Incline Bench Press", "Barbell Curl", "Barbell Deadlift"]
  
    const imgUrls = assets.map((key)=> {
        const encodedKey = encodeURI(key)
        return `https://workoutgifs-reps-n-recipes.s3.us-west-1.amazonaws.com/${encodedKey}.gif`;
    })
    // const key = 'https://workoutgifs-reps-n-recipes.s3.us-west-1.amazonaws.com/Dumbbell Incline Bench Press'; 

    // const encodedKey = encodeURIComponent(key);

    // const imgSrc = `https://workoutgifs-reps-n-recipes.s3.us-west-1.amazonaws.com/${encodedKey}`;
    // `https://workoutgifs-reps-n-recipes.s3.us-west-1.amazonaws.com/${assets[0]}`

  // Seed data
    await Exercise.create({
        name: assets[0],
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength',
        gif: imgUrls[0]
    })
    await Exercise.create({
        name: assets[1],
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength',
        gif: imgUrls[1]
    })
    await Exercise.create({
        name: assets[2],
        type: 'compound',
        muscleGroup: 'back',
        workoutType: 'strength',
        gif: imgUrls[2]
    })
    await Exercise.create({
        name: assets[3],
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength',
        gif: imgUrls[3]
    })
    await Exercise.create({
        name: assets[4],
        type: 'compound',
        muscleGroup: 'back',
        workoutType: 'strength',
        gif: imgUrls[4]
    })
    await Exercise.create({
        name: assets[5],
        type: 'compound',
        muscleGroup: 'chest',
        workoutType: 'strength',
        gif: imgUrls[5]
    })
    await Exercise.create({
        name: assets[6],
        type: 'isolation',
        muscleGroup: 'arms',
        workoutType: 'strength',
        gif: imgUrls[6]
    })
    await Exercise.create({
        name: assets[7],
        type: 'compound',
        muscleGroup: 'back',
        workoutType: 'strength',
        gif: imgUrls[7]
    })


  // Disconnect
  await mongoose.disconnect();

}

seedDatabase();