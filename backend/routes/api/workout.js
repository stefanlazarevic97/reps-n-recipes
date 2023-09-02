const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise')
const handleValidationErrors = require("../../validation/handleValidationErrors");
const Workout = mongoose.model('Workout')
const User = mongoose.model('User')
const { requireUser, restoreUser } = require('../../config/passport')
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
            sets: req.body.sets
        }
        console.log(newWorkout)
        let currentUser = await User.findById(req.user._id);
        currentUser.workouts.push(newWorkout);
        await currentUser.save();
        return res.json({ workouts: currentUser.workouts});
    } catch(err) {
        next(err)
    }
})
// router.patch('/:id', requireUser, validateExerciseInput, async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const updatedExercise = await Exercise.findOneAndUpdate(
//             { _id: id, performer: req.user._id },
//             req.body,
//             { new: true }
//         ).populate('performer', '_id username');

//         if (!updatedExercise) {
//             return res.status(404).json({ error: 'Exercise not found or unauthorized' });
//         }

//         return res.json(updatedExercise);
//     } catch (err) {
//         next(err)
//     }
// })
  
// router.delete('/:id', requireUser, async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const deletedExercise = await Exercise.findOneAndDelete(
//             { _id: id, performer: req.user._id }
//         ).populate('performer', '_id username');

//         if (!deletedExercise) {
//             return res.status(404).json({ error: 'Exercise not found or unauthorized' });
//         }

//         return res.json({ message: 'Exercise successfully deleted', deletedExerciseId: deletedExercise._id });
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router;