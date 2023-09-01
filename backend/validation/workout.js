const { check } = require('express-validator');
const { handleValidationErrors } = require('./handleValidationErrors'); 

const validateWorkout = [
    check('title')
        .exists({ checkFalsy: true }) 
        .withMessage('Please provide a title'),
    check('sets')
        .isArray()
        .withMessage('Sets must be an array'),
    handleValidationErrors
];
module.exports = validateWorkout;