const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors'); 

const validateWorkout = [
    check('title')
        .exists({ checkFalsy: true }) 
        .withMessage('Please provide a title'),
    
    check('datePerformed') 
        .isISO8601()
        .withMessage('Please provide a valid date'),
    
    check('sets')
        .isArray()
        .withMessage('Sets must be an array'),
    
    check('sets.*.repetitions')
        .isInt({ min: 1, max: 20 })  
        .withMessage('Reps must be an integer from 1-20'),

    handleValidationErrors
];
module.exports = validateWorkout;