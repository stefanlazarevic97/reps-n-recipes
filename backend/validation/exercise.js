const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateExerciseInput = [
    check('workout')
        .exists({ checkFalsy: true })
        .withMessage('Workout cannot be empty')
        .notEmpty()
        .withMessage('Workout not found'),
    check('workoutType')
        .exists({ checkFalsy: true })
        .withMessage('Workout type cannot be empty')
        .isIn(['compound', 'accessory'])
        .withMessage('Must be a valid type'),
    check('workoutMuscleGroup')
        .exists({ checkFalsy: true })
        .withMessage('Workout muscle group cannot be empty')
        .isIn(['chest', 'back', 'shoulders', 'legs', 'arms', 'core'])
        .withMessage('Must be a valid muscle group'),
    check('datePerformed')
        .exists({ checkFalsy: true })
        .withMessage('Date cannot be empty'),
    handleValidationErrors
]

module.exports = validateExerciseInput;