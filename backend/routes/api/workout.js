const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise')
const handleValidationErrors = require("../../validation/handleValidationErrors");
const Workout = mongoose.model('Workout')
const User = mongoose.model('User')
const { requireUser } = require('../../config/passport')
const validateWorkout = require('../../validation/workout');

router.get('/', requireUser, async (req, res) => {
    try {
        const exercises = await Exercise.find({ performer: req.user._id })
        .populate('performer', '_id username')
        return res.json(exercises)
    } catch(err) {
        return res.json([])
    } 
})

router.get('/', requireUser, async (req, res) => {
    try {
        const workouts = await Workout.find({ performer: req.user._id })
        .populate('performer', '_id username')
        return res.json(workouts)
    } catch(err) {
        return res.json([])
    }
})

router.post('/', requireUser, async (req, res, next) => {
    try {
        const newWorkout = {
            title: req.body.title,
            sets: req.body.sets,
            datePerformed: req.body.datePerformed
        }
        
        let currentUser = await User.findById(req.user._id);
        currentUser.workouts.push(newWorkout);
        await currentUser.save();
        return res.json({ workouts: currentUser.workouts});
    } catch(err) {
        next(err)
    }
})

module.exports = router;