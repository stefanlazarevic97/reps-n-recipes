const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLoginInput = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email')
        .isEmail()
        .withMessage('Email is invalid'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .isLength({ min: 6, max: 30 })
        .withMessage('Password must be between 6 and 30 characters'),
    handleValidationErrors
];

module.exports = validateLoginInput;