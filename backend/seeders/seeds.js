const mongoose = require("mongoose");
const { mongoURI: dbUri } = require('../config/keys');
const Exercise = require('../models/Exercise')

const seedDatabase = async () => {
    await mongoose.connect(dbUri); 

    Exercise.collection.drop()

    const chestExercises = ["Barbell Bench Press", "Dumbbell Bench Press", "Barbell Incline Bench Press", "Dumbbell Incline Bench Press", "Barbell Decline Bench Press", "Dumbbell Decline Bench Press", "Cable Fly", "Dumbbell Chest Fly", "Machine Chest Fly", "Machine Chest Press", "Machine Incline Press", "Push-up"]

    const backExercises = ["Pendlay Row", "Barbell Bent-over Row", "Dumbbell Bent-over Row", "Incline Dumbbell Row", "Pull-up", "Chin-up", "Neutral Grip Pull-up", "Lat Pulldown", "Cable Row", "Wide Grip Cable Row", "Seated Machine Row", "Machine Lat Pulldown", "T-Bar Row", "Dumbbell Pullover", "Barbell Pullover", "Cable Pullover", "Back Extension"]

    const shoulderExercises = ["Seated Barbell Overhead Press", "Standing Barbell Overhead Press", "Standing Dumbbell Overhead Press", "Arnold Press", "Dumbbell Lateral Raise", "Cable Lateral Raise", "Machine Lateral Raise", "Dumbbell Reverse Fly", "Cable Reverse Fly", "Machine Reverse Fly", "Upright Row", "Front Raise", "Machine Shoulder Press", "Barbell Shrug", "Dumbbell Shrug", "Face Pull", "Cable External Rotation", "Cable Internal Rotation", "Seated Dumbbell Overhead Press"]

    const bicepExercises = ["Barbell Bicep Curl", "Dumbbell Bicep Curl", "Hammer Curl", "Preacher Curl", "Rope Cable Curl", "Straight Bar Cable Curl", "Machine Curl", "Dumbbell Reverse Curl", "Barbell Reverse Curl", "Concentration Curl", "EZ Bar Bicep Curl", "Incline Dumbbell Curl", "Spider Curl"]

    const tricepExercises = ["Single Arm Tricep Pushdown", "Rope Tricep Pushdown", "Straight Bar Tricep Pushdown", "Dumbbell Tricep Extension", "Machine Tricep Extension", "Dip", "Bench Dip", "Close Grip Bench Press", "Barbell Skullcrusher", "Dumbbell Skullcrusher", "EZ Bar Tricep Extension", "Overhead Cable Tricep Extension", "Cable Tricep Kickback"]

    const quadExercises = ["Barbell Back Squat", "Barbell Front Squat", "Goblet Squat", "Hack Squat", "Leg Press", "Machine Leg Press", "Single Leg Leg Press", "Dumbbell Lunge", "Barbell Lunge", "Barbell Bulgarian Split Squats", "Dumbbell Bulgarian Split Squats", "Pistol Squat", "Leg Extension", "Sissy Squat", "Box Squat", "Sumo Deadlift", "Trap Bar Deadlift", "Cossack Squat"]

    const hamstringExercises = ["Deadlift", "Barbell Romanian Deadlift", "Dumbbell Romanian Deadlift", "Barbell Stiff Leg Deadlift", "Dumbbell Stiff Leg Deadlift",  "Lying Leg Curl", "Seated Leg Curl", "Kneeling Single Leg Hamstring Curl", "Glute Ham Raise", "Exercise Ball Leg Curl", "Single Leg Romanian Deadlift", "Standing Good Morning", "Seated Good Morning"]

    const calfExercises = ["Barbell Standing Calf Raise", "Machine Standing Calf Raise","Seated Calf Raise", "Dumbbell Standing Calf Raise", "Standing Single Leg Calf Raise", "Donkey Calf Raise", "Smith Machine Calf Raise", "Calf Press"]

    const gluteExercises = ["Barbell Hip Thrust", "Machine Hip Thrust", "Glute Kickback", "Glute Bridge", "Single Leg Glute Bridge", "Kettlebell Swing", "Curtsy Lunge"]

    const coreExercises = ["Cable Crunch", "Machine Crunch", "Plank", "Side Plank", "Hanging Leg Raise", "Ab Wheel Rollout", "Russian Twist", "Pallof Press", "Sit Up", "V-Sit", "Bicycle Crunch", "Decline Crunch", "Side Bend", "Flutter Kicks", "Lying Leg Raise"]

    const chestImgUrls = chestExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/chest/${i}.gif`
    })

    const backImgUrls = backExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/back/${i}.gif`
    })

    const shoulderImgUrls = shoulderExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/shoulder/${i}.gif`
    })

    const bicepImgUrls = bicepExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/bicep/${i}.gif`
    })

    const tricepImgUrls = tricepExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/tricep/${i}.gif`
    })

    const quadImgUrls = quadExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/quad/${i}.gif`
    })

    const hamstringImgUrls = hamstringExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/hamstring/${i}.gif`
    })

    const calfImgUrls = calfExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/calf/${i}.gif`
    })

    const gluteImgUrls = gluteExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/glute/${i}.gif`
    })

    const coreImgUrls = coreExercises.map((key, i)=> {
        return `https://reps-n-recipes-seed-exercises.s3.us-west-1.amazonaws.com/core/${i}.gif`
    })

    console.log("Seeding data...")

    const exerciseData = [
        { nameArr: chestExercises, imgUrlArr: chestImgUrls, muscleGroup: 'chest' },
        { nameArr: backExercises, imgUrlArr: backImgUrls, muscleGroup: 'back' },
        { nameArr: shoulderExercises, imgUrlArr: shoulderImgUrls, muscleGroup: 'shoulders' },
        { nameArr: bicepExercises, imgUrlArr: bicepImgUrls, muscleGroup: 'bicep' },
        { nameArr: tricepExercises, imgUrlArr: tricepImgUrls, muscleGroup: 'tricep' },
        { nameArr: quadExercises, imgUrlArr: quadImgUrls, muscleGroup: 'quad' },
        { nameArr: hamstringExercises, imgUrlArr: hamstringImgUrls, muscleGroup: 'hamstring' },
        { nameArr: calfExercises, imgUrlArr: calfImgUrls, muscleGroup: 'calf' },
        { nameArr: gluteExercises, imgUrlArr: gluteImgUrls, muscleGroup: 'glute' },
        { nameArr: coreExercises, imgUrlArr: coreImgUrls, muscleGroup: 'core' }
    ];

    console.log("Iterating through exerciseData...")

    for (let exercise of exerciseData) {
        for (let i = 0; i < exercise.nameArr.length; i++) {
            try {
                await Exercise.create({
                    name: exercise.nameArr[i],
                    muscleGroup: exercise.muscleGroup,
                    gif: exercise.imgUrlArr[i]
                });
            } catch (err) {
                console.error(`Error creating exercise: ${exercise.nameArr[i]}`, err);
            }
        }
    }

    console.log("Done!")

    await mongoose.disconnect();
}

seedDatabase();