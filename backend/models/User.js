const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    foodQuantity: {
        type: Number,
        required: true
    },
    foodQuantityUnit: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    gramsCarbs: {
        type: Number,
        required: true
    },
    gramsFat: {
        type: Number,
        required: true
    },
    gramsProtein: {
        type: Number,
        required: true
    },
    dateConsumed: {
        type: Date,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const workoutSchema = new Schema({
    title: { 
        type: String,
        required: true 
    },
    performer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    sets: []

}, { timestamps: true });

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
    nutrition: [nutritionSchema],
    workout: [workoutSchema],
    healthData: {
        mass: Number,
        height: Number,
        age: Number,
        sex: String,
        activityLevel: Number,
        TDEE: Number,
        weightGoal: Number
    }
    }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);