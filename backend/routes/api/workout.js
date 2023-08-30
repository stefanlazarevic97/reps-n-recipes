const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise')
const { requireUser } = require('../../config/passport')
const validateWorkout = require('../../validation/workout')


router.get('/', requireUser, async (req, res) => {
    try {
        const exercises = await Exercise.find({ performer: req.user._id })
        .populate('performer', '_id username')
        return res.json(exercises)
    } catch(err) {
        return res.json([])
    } 
})

router.post('/', validateWorkout, async (req, res) => {
    const workout = await Workout.create(req.body);
    return res.json(workout);
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