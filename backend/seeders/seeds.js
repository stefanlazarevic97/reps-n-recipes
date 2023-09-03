const mongoose = require("mongoose");
const { mongoURI: dbUri } = require('../config/keys');
const Exercise = require('../models/Exercise');
const User = require ('../models/User');
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("*MongoDB CONNECTED*");

        console.log("Dropping exercises...");
        await Exercise.collection.drop();

        console.log("Dropping users...");
        await User.collection.drop();

        console.log("Dropped collections!");

        const chestExercises = ["Barbell Bench Press", "Dumbbell Bench Press", "Barbell Incline Bench Press", "Dumbbell Incline Bench Press", "Barbell Decline Bench Press", "Dumbbell Decline Bench Press", "Cable Fly", "Dumbbell Chest Fly", "Machine Chest Fly", "Machine Chest Press", "Machine Incline Press", "Push-up", "Barbell Bench Press"]

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

        console.log("Iterating through exercises...")

        const seedExercises = async () => {
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
        }

        const foods = [
            { foodName: "Chicken Breast", calories: 165, gramsCarbs: 0, gramsFat: 3.6, gramsProtein: 31 },
            { foodName: "Pork Chop", calories: 242, gramsCarbs: 0, gramsFat: 14, gramsProtein: 27 },
            { foodName: "Ribeye Steak", calories: 291, gramsCarbs: 0, gramsFat: 24, gramsProtein: 19 },
            { foodName: "Ground Beef", calories: 250, gramsCarbs: 0, gramsFat: 17, gramsProtein: 26 },
            { foodName: "Turkey Slices", calories: 135, gramsCarbs: 0, gramsFat: 1, gramsProtein: 28 },
            { foodName: "Lamb Chops", calories: 292, gramsCarbs: 0, gramsFat: 24, gramsProtein: 18 },
            { foodName: "Fish Fillet", calories: 232, gramsCarbs: 0, gramsFat: 12, gramsProtein: 22 },
            { foodName: "Sausages", calories: 301, gramsCarbs: 2, gramsFat: 27, gramsProtein: 12 },
            { foodName: "Bacon Strips", calories: 541, gramsCarbs: 1.4, gramsFat: 42, gramsProtein: 37 },
            { foodName: "Duck Breast", calories: 337, gramsCarbs: 0, gramsFat: 28, gramsProtein: 19 },
            { foodName: "Venison", calories: 158, gramsCarbs: 0, gramsFat: 3, gramsProtein: 30 },
            { foodName: "Beef Brisket", calories: 331, gramsCarbs: 0, gramsFat: 27, gramsProtein: 20 },
            { foodName: "Ham", calories: 163, gramsCarbs: 0, gramsFat: 5, gramsProtein: 27 },
            { foodName: "Goose", calories: 319, gramsCarbs: 0, gramsFat: 25, gramsProtein: 25 },
            { foodName: "Corned Beef", calories: 251, gramsCarbs: 0, gramsFat: 18, gramsProtein: 24 },
            { foodName: "Chicken Thighs", calories: 209, gramsCarbs: 0, gramsFat: 11, gramsProtein: 26 },
            { foodName: "Pork Belly", calories: 518, gramsCarbs: 0, gramsFat: 53, gramsProtein: 9 },
            { foodName: "T-Bone Steak", calories: 294, gramsCarbs: 0, gramsFat: 21, gramsProtein: 25 },
            { foodName: "Beef Ribs", calories: 278, gramsCarbs: 0, gramsFat: 22, gramsProtein: 20 },
            { foodName: "Chicken Drumstick", calories: 172, gramsCarbs: 0, gramsFat: 10, gramsProtein: 20 },
            { foodName: "Smoked Salmon", calories: 177, gramsCarbs: 0, gramsFat: 11, gramsProtein: 25 },
            { foodName: "Pork Loin", calories: 143, gramsCarbs: 0, gramsFat: 4, gramsProtein: 27 },
            { foodName: "Chicken Wings", calories: 290, gramsCarbs: 0, gramsFat: 19, gramsProtein: 27 },
            { foodName: "Beef Tenderloin", calories: 143, gramsCarbs: 0, gramsFat: 5, gramsProtein: 23 },
            { foodName: "Quail", calories: 134, gramsCarbs: 0, gramsFat: 2, gramsProtein: 25 },
            { foodName: "Lamb Shank", calories: 234, gramsCarbs: 0, gramsFat: 12, gramsProtein: 21 },
            { foodName: "Pheasant", calories: 133, gramsCarbs: 0, gramsFat: 2, gramsProtein: 29 },
            { foodName: "Beef Sirloin", calories: 271, gramsCarbs: 0, gramsFat: 21, gramsProtein: 22 },
            { foodName: "Mutton", calories: 294, gramsCarbs: 0, gramsFat: 24, gramsProtein: 25 },
            { foodName: "Chicken Liver", calories: 119, gramsCarbs: 1, gramsFat: 5, gramsProtein: 17 },
            { foodName: "Pork Shoulder", calories: 331, gramsCarbs: 0, gramsFat: 24, gramsProtein: 28 },
            { foodName: "Veal", calories: 172, gramsCarbs: 0, gramsFat: 5, gramsProtein: 31 },
            { foodName: "Chicken Feet", calories: 215, gramsCarbs: 0, gramsFat: 15, gramsProtein: 19 },
            { foodName: "Tilapia", calories: 96, gramsCarbs: 0, gramsFat: 1.7, gramsProtein: 20 },
            { foodName: "Turkey Leg", calories: 212, gramsCarbs: 0, gramsFat: 8, gramsProtein: 32 },
            { foodName: "Beef Chuck", calories: 250, gramsCarbs: 0, gramsFat: 17, gramsProtein: 22 },
            { foodName: "Pork Ribs", calories: 277, gramsCarbs: 0, gramsFat: 21, gramsProtein: 22 },
            { foodName: "Catfish", calories: 105, gramsCarbs: 0, gramsFat: 2.6, gramsProtein: 18 },
            { foodName: "Rabbit", calories: 173, gramsCarbs: 0, gramsFat: 7, gramsProtein: 28 },
            { foodName: "Goat Meat", calories: 109, gramsCarbs: 0, gramsFat: 2, gramsProtein: 20 },
            { foodName: "Broccoli", calories: 34, gramsCarbs: 7, gramsFat: 0.4, gramsProtein: 2.8 },
            { foodName: "Spinach", calories: 23, gramsCarbs: 3.6, gramsFat: 0.4, gramsProtein: 2.9 },
            { foodName: "Kale", calories: 49, gramsCarbs: 9, gramsFat: 0.9, gramsProtein: 4.3 },
            { foodName: "Carrot", calories: 41, gramsCarbs: 10, gramsFat: 0.2, gramsProtein: 0.9 },
            { foodName: "Cucumber", calories: 16, gramsCarbs: 3.6, gramsFat: 0.1, gramsProtein: 0.7 },
            { foodName: "Cauliflower", calories: 25, gramsCarbs: 5, gramsFat: 0.3, gramsProtein: 1.9 },
            { foodName: "Tomato", calories: 18, gramsCarbs: 4, gramsFat: 0.2, gramsProtein: 0.9 },
            { foodName: "Zucchini", calories: 17, gramsCarbs: 3.1, gramsFat: 0.3, gramsProtein: 1.2 },
            { foodName: "Lettuce", calories: 15, gramsCarbs: 2.9, gramsFat: 0.2, gramsProtein: 1.4 },
            { foodName: "Sweet Potato", calories: 86, gramsCarbs: 20, gramsFat: 0.1, gramsProtein: 1.6 },
            { foodName: "Bell Pepper", calories: 20, gramsCarbs: 5, gramsFat: 0.2, gramsProtein: 1 },
            { foodName: "Eggplant", calories: 25, gramsCarbs: 6, gramsFat: 0.2, gramsProtein: 1 },
            { foodName: "Asparagus", calories: 20, gramsCarbs: 4, gramsFat: 0.1, gramsProtein: 2.2 },
            { foodName: "Celery", calories: 16, gramsCarbs: 3, gramsFat: 0.2, gramsProtein: 0.7 },
            { foodName: "Beetroot", calories: 43, gramsCarbs: 10, gramsFat: 0.2, gramsProtein: 1.6 },
            { foodName: "Avocado", calories: 160, gramsCarbs: 9, gramsFat: 15, gramsProtein: 2 },
            { foodName: "Green Beans", calories: 31, gramsCarbs: 7, gramsFat: 0.1, gramsProtein: 1.8 },
            { foodName: "Garlic", calories: 149, gramsCarbs: 33, gramsFat: 0.5, gramsProtein: 6.4 },
            { foodName: "Onion", calories: 40, gramsCarbs: 9, gramsFat: 0.1, gramsProtein: 1.1 },
            { foodName: "Mushroom", calories: 22, gramsCarbs: 3.3, gramsFat: 0.3, gramsProtein: 3.1 },
            { foodName: "Pumpkin", calories: 26, gramsCarbs: 6, gramsFat: 0.1, gramsProtein: 1 },
            { foodName: "Squash", calories: 34, gramsCarbs: 9, gramsFat: 0.3, gramsProtein: 1 },
            { foodName: "Peas", calories: 81, gramsCarbs: 14, gramsFat: 0.4, gramsProtein: 5 },
            { foodName: "Cabbage", calories: 25, gramsCarbs: 6, gramsFat: 0.1, gramsProtein: 1.3 },
            { foodName: "Brussels Sprouts", calories: 43, gramsCarbs: 9, gramsFat: 0.3, gramsProtein: 3.4 },
            { foodName: "Turnip", calories: 28, gramsCarbs: 6, gramsFat: 0.1, gramsProtein: 0.9 },
            { foodName: "Artichoke", calories: 47, gramsCarbs: 11, gramsFat: 0.2, gramsProtein: 3.3 },
            { foodName: "Fennel", calories: 31, gramsCarbs: 7, gramsFat: 0.2, gramsProtein: 1.2 },
            { foodName: "Radish", calories: 16, gramsCarbs: 3.4, gramsFat: 0.1, gramsProtein: 0.7 },
            { foodName: "Leek", calories: 23, gramsCarbs: 11.2, gramsFat: 0.2, gramsProtein: 0.9 },
            { foodName: "Whole Milk", calories: 61, gramsCarbs: 4.8, gramsFat: 3.3, gramsProtein: 3.2 },
            { foodName: "Skimmed Milk", calories: 34, gramsCarbs: 5, gramsFat: 0.1, gramsProtein: 3.4 },
            { foodName: "Cheddar Cheese", calories: 402, gramsCarbs: 1.3, gramsFat: 33.1, gramsProtein: 25 },
            { foodName: "Mozzarella", calories: 280, gramsCarbs: 2.2, gramsFat: 17, gramsProtein: 28 },
            { foodName: "Cottage Cheese", calories: 98, gramsCarbs: 3.4, gramsFat: 4.3, gramsProtein: 11.1 },
            { foodName: "Butter", calories: 717, gramsCarbs: 0.1, gramsFat: 81, gramsProtein: 0.9 },
            { foodName: "Yogurt (full fat)", calories: 61, gramsCarbs: 4.7, gramsFat: 3.3, gramsProtein: 3.5 },
            { foodName: "Yogurt (low fat)", calories: 56, gramsCarbs: 7.7, gramsFat: 1.6, gramsProtein: 4 },
            { foodName: "Cream", calories: 340, gramsCarbs: 2.8, gramsFat: 36, gramsProtein: 2 },
            { foodName: "Parmesan Cheese", calories: 431, gramsCarbs: 4, gramsFat: 29, gramsProtein: 38 },
            { foodName: "Swiss Cheese", calories: 380, gramsCarbs: 5, gramsFat: 28, gramsProtein: 27 },
            { foodName: "Feta Cheese", calories: 264, gramsCarbs: 4, gramsFat: 21, gramsProtein: 14 },
            { foodName: "Cream Cheese", calories: 342, gramsCarbs: 4.1, gramsFat: 34, gramsProtein: 6 },
            { foodName: "Ricotta Cheese", calories: 174, gramsCarbs: 3.9, gramsFat: 13, gramsProtein: 11.3 },
            { foodName: "Brie Cheese", calories: 334, gramsCarbs: 0.5, gramsFat: 27.7, gramsProtein: 20.7 },
            { foodName: "Blue Cheese", calories: 353, gramsCarbs: 2.3, gramsFat: 28.7, gramsProtein: 21.4 },
            { foodName: "Ice Cream (vanilla)", calories: 207, gramsCarbs: 24, gramsFat: 11, gramsProtein: 3.8 },
            { foodName: "Sour Cream", calories: 198, gramsCarbs: 4.6, gramsFat: 20, gramsProtein: 2.4 },
            { foodName: "Goat Milk", calories: 69, gramsCarbs: 4.5, gramsFat: 4.1, gramsProtein: 3.6 },
            { foodName: "Goat Cheese", calories: 364, gramsCarbs: 2, gramsFat: 30, gramsProtein: 22 },
            { foodName: "Camembert Cheese", calories: 299, gramsCarbs: 0.1, gramsFat: 24.3, gramsProtein: 19.8 },
            { foodName: "Ghee", calories: 900, gramsCarbs: 0, gramsFat: 100, gramsProtein: 0 },
            { foodName: "Mascarpone", calories: 453, gramsCarbs: 3.6, gramsFat: 47, gramsProtein: 5.8 },
            { foodName: "Evaporated Milk", calories: 134, gramsCarbs: 10.4, gramsFat: 6.7, gramsProtein: 6.7 },
            { foodName: "Condensed Milk", calories: 321, gramsCarbs: 54, gramsFat: 8.7, gramsProtein: 7.9 },
            { foodName: "Whey Protein", calories: 410, gramsCarbs: 8.5, gramsFat: 6, gramsProtein: 80 },
            { foodName: "Milk Chocolate", calories: 535, gramsCarbs: 59, gramsFat: 30, gramsProtein: 7.4 },
            { foodName: "Lactose-free Milk", calories: 48, gramsCarbs: 5, gramsFat: 2, gramsProtein: 3.3 },
            { foodName: "Buttermilk", calories: 40, gramsCarbs: 4.8, gramsFat: 0.9, gramsProtein: 3.3 },
            { foodName: "Sheep Milk", calories: 108, gramsCarbs: 5.4, gramsFat: 7, gramsProtein: 5.6 },
            { foodName: "Apple", calories: 52, gramsCarbs: 14, gramsFat: 0.2, gramsProtein: 0.3 },
            { foodName: "Banana", calories: 89, gramsCarbs: 23, gramsFat: 0.3, gramsProtein: 1.1 },
            { foodName: "Cherry", calories: 63, gramsCarbs: 16, gramsFat: 0.2, gramsProtein: 1 },
            { foodName: "Date", calories: 282, gramsCarbs: 75, gramsFat: 0.4, gramsProtein: 2.5 },
            { foodName: "Grapefruit", calories: 33, gramsCarbs: 9, gramsFat: 0.1, gramsProtein: 0.7 },
            { foodName: "Kiwi", calories: 61, gramsCarbs: 15, gramsFat: 0.5, gramsProtein: 1.1 },
            { foodName: "Lemon", calories: 29, gramsCarbs: 9, gramsFat: 0.3, gramsProtein: 1.1 },
            { foodName: "Mango", calories: 60, gramsCarbs: 15, gramsFat: 0.4, gramsProtein: 0.8 },
            { foodName: "Orange", calories: 43, gramsCarbs: 9, gramsFat: 0.2, gramsProtein: 1 },
            { foodName: "Peach", calories: 39, gramsCarbs: 10, gramsFat: 0.3, gramsProtein: 0.9 },
            { foodName: "Pineapple", calories: 50, gramsCarbs: 13, gramsFat: 0.1, gramsProtein: 0.5 },
            { foodName: "Plum", calories: 46, gramsCarbs: 12, gramsFat: 0.3, gramsProtein: 0.7 },
            { foodName: "Raspberry", calories: 52, gramsCarbs: 12, gramsFat: 0.7, gramsProtein: 1.2 },
            { foodName: "Strawberry", calories: 32, gramsCarbs: 8, gramsFat: 0.3, gramsProtein: 0.7 },
            { foodName: "Watermelon", calories: 30, gramsCarbs: 8, gramsFat: 0.2, gramsProtein: 0.6 },
            { foodName: "Avocado", calories: 160, gramsCarbs: 9, gramsFat: 15, gramsProtein: 2 },
            { foodName: "Blackberry", calories: 43, gramsCarbs: 10, gramsFat: 0.5, gramsProtein: 1.4 },
            { foodName: "Blueberry", calories: 57, gramsCarbs: 14, gramsFat: 0.3, gramsProtein: 0.7 },
            { foodName: "Coconut", calories: 354, gramsCarbs: 15, gramsFat: 33, gramsProtein: 3.3 },
            { foodName: "Durian", calories: 149, gramsCarbs: 27, gramsFat: 5, gramsProtein: 1.5 },
            { foodName: "Grape", calories: 70, gramsCarbs: 17, gramsFat: 0.2, gramsProtein: 0.6 },
            { foodName: "Lychee", calories: 66, gramsCarbs: 17, gramsFat: 0.4, gramsProtein: 0.8 },
            { foodName: "Papaya", calories: 43, gramsCarbs: 11, gramsFat: 0.3, gramsProtein: 0.5 },
            { foodName: "Pear", calories: 57, gramsCarbs: 15, gramsFat: 0.1, gramsProtein: 0.4 },
            { foodName: "Pomegranate", calories: 83, gramsCarbs: 19, gramsFat: 1.2, gramsProtein: 1.7 },
            { foodName: "Tangerine", calories: 53, gramsCarbs: 13, gramsFat: 0.3, gramsProtein: 0.8 },
            { foodName: "Cantaloupe", calories: 34, gramsCarbs: 8, gramsFat: 0.2, gramsProtein: 0.8 },
            { foodName: "Cranberry", calories: 46, gramsCarbs: 12, gramsFat: 0.1, gramsProtein: 0.4 },
            { foodName: "Fig", calories: 74, gramsCarbs: 19, gramsFat: 0.3, gramsProtein: 0.8 },
            { foodName: "Honeydew", calories: 36, gramsCarbs: 9, gramsFat: 0.1, gramsProtein: 0.5 },
            { foodName: "Potato Chips", calories: 547, gramsCarbs: 49.74, gramsFat: 37.47, gramsProtein: 6.39 },
            { foodName: "Pretzels", calories: 380, gramsCarbs: 80, gramsFat: 3, gramsProtein: 10 },
            { foodName: "Popcorn (air-popped)", calories: 387, gramsCarbs: 77.9, gramsFat: 4.5, gramsProtein: 12.9 },
            { foodName: "Trail Mix", calories: 462, gramsCarbs: 44.6, gramsFat: 30.6, gramsProtein: 12.6 },
            { foodName: "Granola Bar", calories: 471, gramsCarbs: 66.3, gramsFat: 20.7, gramsProtein: 7.1 },
            { foodName: "Gummy Bears", calories: 324, gramsCarbs: 77, gramsFat: 0.2, gramsProtein: 6.9 },
            { foodName: "Dark Chocolate", calories: 546, gramsCarbs: 45.9, gramsFat: 31, gramsProtein: 5.4 },
            { foodName: "Peanuts", calories: 567, gramsCarbs: 16.13, gramsFat: 49.24, gramsProtein: 25.8 },
            { foodName: "Beef Jerky", calories: 410, gramsCarbs: 9.6, gramsFat: 25.6, gramsProtein: 33.2 },
            { foodName: "Almonds", calories: 575, gramsCarbs: 21.55, gramsFat: 49.93, gramsProtein: 21.26 },
            { foodName: "Raisins", calories: 325, gramsCarbs: 79.18, gramsFat: 0.54, gramsProtein: 3.07 },
            { foodName: "Cashews", calories: 553, gramsCarbs: 30.19, gramsFat: 43.85, gramsProtein: 18.22 },
            { foodName: "Rice Cakes", calories: 387, gramsCarbs: 81.5, gramsFat: 0.5, gramsProtein: 8 },
            { foodName: "Muffin", calories: 377, gramsCarbs: 51, gramsFat: 17.1, gramsProtein: 5.4 },
            { foodName: "Doughnut", calories: 452, gramsCarbs: 51.2, gramsFat: 25.2, gramsProtein: 4.9 },
            { foodName: "Snickers Bar", calories: 448, gramsCarbs: 56.3, gramsFat: 21.5, gramsProtein: 6.7 },
            { foodName: "Jelly Beans", calories: 350, gramsCarbs: 90, gramsFat: 0, gramsProtein: 0 },
            { foodName: "Cheese Puffs", calories: 536, gramsCarbs: 60.4, gramsFat: 30.9, gramsProtein: 5.5 },
            { foodName: "Fruit Roll-Ups", calories: 371, gramsCarbs: 90, gramsFat: 3.3, gramsProtein: 0 },
            { foodName: "Oreos", calories: 482, gramsCarbs: 67, gramsFat: 20.9, gramsProtein: 4.7 },
            { foodName: "Crispy Rice Treats", calories: 401, gramsCarbs: 85.8, gramsFat: 5.2, gramsProtein: 3.8 },
            { foodName: "Fruit Snacks", calories: 325, gramsCarbs: 78.1, gramsFat: 0.2, gramsProtein: 4 },
            { foodName: "Pistachios", calories: 562, gramsCarbs: 27.51, gramsFat: 45.32, gramsProtein: 20.27 },
            { foodName: "Walnuts", calories: 654, gramsCarbs: 13.71, gramsFat: 65.21, gramsProtein: 15.23 },
            { foodName: "Chocolate Chip Cookies", calories: 498, gramsCarbs: 58.5, gramsFat: 25.1, gramsProtein: 5.4 },
            { foodName: "Goldfish Crackers", calories: 538, gramsCarbs: 64.2, gramsFat: 26.7, gramsProtein: 12.5 },
            { foodName: "Tortilla Chips", calories: 489, gramsCarbs: 64.3, gramsFat: 23.4, gramsProtein: 7.4 },
            { foodName: "Salted Peanuts", calories: 599, gramsCarbs: 10.6, gramsFat: 51.3, gramsProtein: 28.03 },
            { foodName: "Caramel Popcorn", calories: 415, gramsCarbs: 70, gramsFat: 13, gramsProtein: 4 },
            { foodName: "Sunflower Seeds", calories: 584, gramsCarbs: 20, gramsFat: 51.5, gramsProtein: 21 },
            { foodName: "White Rice", calories: 130, gramsCarbs: 28, gramsFat: 0.3, gramsProtein: 2.7 },
            { foodName: "Brown Rice", calories: 111, gramsCarbs: 23, gramsFat: 1, gramsProtein: 2.6 },
            { foodName: "Whole Wheat Pasta", calories: 124, gramsCarbs: 27, gramsFat: 1, gramsProtein: 5 },
            { foodName: "White Pasta", calories: 131, gramsCarbs: 25, gramsFat: 1.1, gramsProtein: 5 },
            { foodName: "Quinoa", calories: 120, gramsCarbs: 21, gramsFat: 1.9, gramsProtein: 4.1 },
            { foodName: "White Bread", calories: 266, gramsCarbs: 49, gramsFat: 3.3, gramsProtein: 9 },
            { foodName: "Whole Wheat Bread", calories: 247, gramsCarbs: 41, gramsFat: 3, gramsProtein: 13 },
            { foodName: "Oatmeal", calories: 68, gramsCarbs: 12, gramsFat: 1.4, gramsProtein: 2.5 },
            { foodName: "Cornmeal", calories: 384, gramsCarbs: 81, gramsFat: 4.2, gramsProtein: 6.9 },
            { foodName: "Black Beans", calories: 132, gramsCarbs: 24, gramsFat: 0.5, gramsProtein: 8.2 },
            { foodName: "Lentils", calories: 116, gramsCarbs: 20, gramsFat: 0.4, gramsProtein: 9 },
            { foodName: "Potato", calories: 77, gramsCarbs: 17, gramsFat: 0.1, gramsProtein: 2 },
            { foodName: "Sweet Potato", calories: 86, gramsCarbs: 20, gramsFat: 0.1, gramsProtein: 1.6 },
            { foodName: "Bagel", calories: 250, gramsCarbs: 48, gramsFat: 1.2, gramsProtein: 10 },
            { foodName: "Muesli", calories: 289, gramsCarbs: 56, gramsFat: 7.1, gramsProtein: 10 },
            { foodName: "Couscous", calories: 112, gramsCarbs: 23, gramsFat: 0.2, gramsProtein: 3.8 },
            { foodName: "Barley", calories: 123, gramsCarbs: 28, gramsFat: 0.8, gramsProtein: 2.3 },
            { foodName: "Buckwheat", calories: 92, gramsCarbs: 20, gramsFat: 1, gramsProtein: 3.4 },
            { foodName: "Spaghetti", calories: 158, gramsCarbs: 31, gramsFat: 1.3, gramsProtein: 6 },
            { foodName: "Corn", calories: 86, gramsCarbs: 19, gramsFat: 1.2, gramsProtein: 3.2 },
            { foodName: "Tortilla", calories: 218, gramsCarbs: 37, gramsFat: 4.7, gramsProtein: 6 },
            { foodName: "Rye Bread", calories: 258, gramsCarbs: 48, gramsFat: 1.1, gramsProtein: 8.5 },
            { foodName: "Granola", calories: 471, gramsCarbs: 64, gramsFat: 20, gramsProtein: 10 },
            { foodName: "Millet", calories: 118, gramsCarbs: 23, gramsFat: 1, gramsProtein: 3.5 },
            { foodName: "Pita Bread", calories: 275, gramsCarbs: 55, gramsFat: 1.2, gramsProtein: 9 },
            { foodName: "Sourdough Bread", calories: 270, gramsCarbs: 52, gramsFat: 1, gramsProtein: 12 },
            { foodName: "Naan", calories: 298, gramsCarbs: 52, gramsFat: 6.9, gramsProtein: 9 },
            { foodName: "Bulgar Wheat", calories: 83, gramsCarbs: 18, gramsFat: 0.2, gramsProtein: 3.1 },
            { foodName: "Polenta", calories: 85, gramsCarbs: 18, gramsFat: 0.5, gramsProtein: 1.9 },
            { foodName: "Tofu", calories: 76, gramsCarbs: 1.9, gramsFat: 4.8, gramsProtein: 8 },
            { foodName: "Tempeh", calories: 193, gramsCarbs: 9, gramsFat: 11, gramsProtein: 19 },
            { foodName: "Soy Milk",  calories: 33, gramsCarbs: 1.3, gramsFat: 1.8, gramsProtein: 3.3 },
            { foodName: "Seitan", calories: 370, gramsCarbs: 14, gramsFat: 2, gramsProtein: 75 },
            { foodName: "Chickpeas", calories: 164, gramsCarbs: 27, gramsFat: 2.6, gramsProtein: 8.9 },
            { foodName: "Black Beans", calories: 132, gramsCarbs: 24, gramsFat: 0.5, gramsProtein: 8.2 },
            { foodName: "Soylent Drink",  calories: 400, gramsCarbs: 37, gramsFat: 21, gramsProtein: 20 },
            { foodName: "Lentils", calories: 116, gramsCarbs: 20, gramsFat: 0.4, gramsProtein: 9 },
            { foodName: "Edamame", calories: 122, gramsCarbs: 9.9, gramsFat: 5.2, gramsProtein: 11 },
            { foodName: "Jackfruit", calories: 95, gramsCarbs: 23, gramsFat: 0.6, gramsProtein: 2.5 },
            { foodName: "Quinoa", calories: 120, gramsCarbs: 21, gramsFat: 1.9, gramsProtein: 4.1 },
            { foodName: "Textured Vegetable Protein", calories: 327, gramsCarbs: 35, gramsFat: 1, gramsProtein: 52 },
            { foodName: "Nutritional Yeast", calories: 325, gramsCarbs: 35, gramsFat: 4, gramsProtein: 50 },
            { foodName: "Almond Milk",  calories: 15, gramsCarbs: 0.6, gramsFat: 1.1, gramsProtein: 0.5 },
            { foodName: "Mycoprotein (Quorn)", calories: 85, gramsCarbs: 3, gramsFat: 2, gramsProtein: 13 },
            { foodName: "Cashews", calories: 553, gramsCarbs: 30, gramsFat: 44, gramsProtein: 18 },
            { foodName: "Oats", calories: 389, gramsCarbs: 66, gramsFat: 6.9, gramsProtein: 17 },
            { foodName: "Portobello Mushrooms", calories: 22, gramsCarbs: 3.3, gramsFat: 0.4, gramsProtein: 2.1 },
            { foodName: "Eggplant", calories: 25, gramsCarbs: 6, gramsFat: 0.2, gramsProtein: 1 },
            { foodName: "Rice Protein Powder", calories: 400, gramsCarbs: 5, gramsFat: 5, gramsProtein: 80 },
            { foodName: "In-N-Out Double-Double Burger", calories: 263, gramsCarbs: 15, gramsFat: 16, gramsProtein: 15 },
            { foodName: "McDonald's Big Mac", calories: 257, gramsCarbs: 21, gramsFat: 14, gramsProtein: 12 },
            { foodName: "Chick-fil-A Nuggets", calories: 321, gramsCarbs: 13, gramsFat: 18, gramsProtein: 28 },
            { foodName: "Taco Bell Crunchy Taco", calories: 212, gramsCarbs: 16, gramsFat: 11, gramsProtein: 10 },
            { foodName: "Burger King Whopper", calories: 221, gramsCarbs: 14, gramsFat: 13, gramsProtein: 11 },
            { foodName: "KFC Original Recipe Chicken", calories: 239, gramsCarbs: 12, gramsFat: 15, gramsProtein: 18 },
            { foodName: "Subway Turkey Breast Sandwich", calories: 90, gramsCarbs: 14, gramsFat: 1, gramsProtein: 9 },
            { foodName: "Domino's Pepperoni Pizza", calories: 271, gramsCarbs: 27, gramsFat: 13, gramsProtein: 12 },
            { foodName: "Starbucks Caffè Latte", calories: 63, gramsCarbs: 6, gramsFat: 3, gramsProtein: 3 },
            { foodName: "Dunkin' Donuts Glazed Donut", calories: 421, gramsCarbs: 51, gramsFat: 22, gramsProtein: 5 },
            { foodName: "Popeyes Chicken Tenders", calories: 295, gramsCarbs: 14, gramsFat: 18, gramsProtein: 19 },
            { foodName: "Chipotle Chicken Burrito", calories: 215, gramsCarbs: 23, gramsFat: 8, gramsProtein: 11 },
            { foodName: "Panera Bread Broccoli Cheddar Soup", calories: 101, gramsCarbs: 7, gramsFat: 6, gramsProtein: 4 },
            { foodName: "Wendy's Baconator", calories: 274, gramsCarbs: 10, gramsFat: 19, gramsProtein: 16 },
            { foodName: "Arby's Classic Roast Beef Sandwich", calories: 199, gramsCarbs: 14, gramsFat: 9, gramsProtein: 14 },
            { foodName: "Olive Garden Fettuccine Alfredo", calories: 162, gramsCarbs: 16, gramsFat: 8, gramsProtein: 5 },
            { foodName: "Red Lobster Cheddar Bay Biscuit", calories: 356, gramsCarbs: 35, gramsFat: 21, gramsProtein: 6 },
            { foodName: "Pizza Hut Supreme Pizza", calories: 272, gramsCarbs: 28, gramsFat: 12, gramsProtein: 12 },
            { foodName: "Shake Shack ShackBurger", calories: 251, gramsCarbs: 19, gramsFat: 14, gramsProtein: 12 },
            { foodName: "Five Guys Cheeseburger", calories: 257, gramsCarbs: 23, gramsFat: 13, gramsProtein: 13 },
            { foodName: "Dairy Queen Blizzard", calories: 212, gramsCarbs: 25, gramsFat: 10, gramsProtein: 4 },
            { foodName: "Jack in the Box Jumbo Jack", calories: 229, gramsCarbs: 20, gramsFat: 12, gramsProtein: 11 },
            { foodName: "Chili's Baby Back Ribs", calories: 312, gramsCarbs: 11, gramsFat: 22, gramsProtein: 19 },
            { foodName: "Outback Steakhouse Bloomin' Onion", calories: 193, gramsCarbs: 14, gramsFat: 14, gramsProtein: 3 },
            { foodName: "Cheesecake Factory Original Cheesecake", calories: 321, gramsCarbs: 25, gramsFat: 23, gramsProtein: 6 },
            { foodName: "Buffalo Wild Wings Traditional Wings", calories: 211, gramsCarbs: 1, gramsFat: 15, gramsProtein: 19 },
            { foodName: "P.F. Chang's Mongolian Beef", calories: 215, gramsCarbs: 16, gramsFat: 10, gramsProtein: 15 },
            { foodName: "Cracker Barrel Old Country Store Chicken Fried Chicken", calories: 240, gramsCarbs: 15, gramsFat: 15, gramsProtein: 12 },
            { foodName: "IHOP Original Buttermilk Pancakes", calories: 227, gramsCarbs: 29, gramsFat: 9, gramsProtein: 6 },
            { foodName: "Texas Roadhouse Prime Rib", calories: 291, gramsCarbs: 0, gramsFat: 23, gramsProtein: 20 }
        ];

        const servings = [0.25, 0.333, 0.5, 0.667, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3]

        const generatePastDates = (startDate, days) => {
            const datesArray = [];

            for (let i = 0; i < days; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() - i);
                const isoString = date.toISOString();
                datesArray.push(isoString);
            }

            return datesArray;
        }

        const startDate = new Date("2023-12-31T00:00:00.000Z");
        const days = 120;
        const datesConsumed = generatePastDates(startDate, days)
        
        const getRandom = (arr) => {
            const index = Math.floor(Math.random() * arr.length);
            return arr[index];
        };

        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        console.log("Iterating through dates...");

        const seedNutritionData = async (foods, servings, datesConsumed) => {
            const nutritionItems = [];
            for (const date of datesConsumed) {
                const dailyItems = getRandomInt(7, 10);

                for (let i = 0; i < dailyItems; i++) {
                    const item = getRandom(foods);
                    const serving = getRandom(servings);
                    
                    const nutritionItem = {
                        servings: serving,
                        dateConsumed: date,
                        foodQuantity: 100,
                        foodQuantityUnit: 'g',
                        foodName: item.foodName,
                        calories: item.calories * serving,
                        gramsCarbs: item.gramsCarbs * serving,
                        gramsFat: item.gramsFat * serving,
                        gramsProtein: item.gramsProtein * serving
                    };
                    
                    nutritionItems.push(nutritionItem);
                }
            }

            return nutritionItems;
        };

        console.log("Seeding demo user...");

        const seedDemoUser = async () => {
            try {
                const hashedPassword = await bcrypt.hash("password", 10);
                const nutritionArray = await seedNutritionData(foods, servings, datesConsumed);

                let initialWeight = 80.0;
                const weightByDate = new Map();

                for (let date of datesConsumed) {
                    let change = Math.random() * (0.1 + 0.25) - 0.25;
                    initialWeight += change;
                    let formattedDate = new Date(date).toISOString().split('T')[0];
                    weightByDate.set(formattedDate, initialWeight);
                }

                const weightByDateObj = Object.fromEntries(weightByDate);

                const demoUser = new User({
                    username: "demo",
                    email: "demo@user.io",
                    hashedPassword: hashedPassword,
                    nutrition: nutritionArray,
                    workouts: [],
                    healthData: {},
                    weightByDate: weightByDateObj
                });

                await demoUser.save();
            } catch (error) {
                console.error("Error seeding demo user:", error);
            }
        };

        console.log("Seeding exercises...");
        await seedExercises();

        console.log("Seeding demo user...");
        await seedDemoUser();

        console.log("Seeding complete!");

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("*MongoDB DISCONNECTED*")
    }
};

seedDatabase();