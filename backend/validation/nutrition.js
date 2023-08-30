const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateFoodInput = [
    check('foodName')
        .exists({ checkFalsy: true })
        .withMessage('Food cannot be empty')
        .notEmpty()
        .withMessage('Food not found'),
    check('foodQuantity')
        .exists({ checkFalsy: true })
        .withMessage('Food quantity cannot be empty')
        .isNumeric()
        .withMessage('Quantity cannot be empty'),
    check('foodQuantityUnit')
        .exists({ checkFalsy: true })
        .withMessage('Food quantity unit cannot be empty')
        .notEmpty()
        .withMessage('Must be a valid unit'),
    check('calories')
        .exists()
        .withMessage('Calories cannot be empty')
        .isNumeric()
        .withMessage('Calories must be a number'),
    check('gramsCarbs')
        .exists()
        .withMessage('Carbs cannot be empty')
        .isNumeric()
        .withMessage('Carbs must be a number'),
    check('gramsFat')
        .exists()
        .withMessage('Fat cannot be empty')
        .isNumeric()
        .withMessage('Fat must be a number'),
    check('gramsProtein')
        .exists()
        .withMessage('Protein cannot be empty')
        .isNumeric()
        .withMessage('Protein must be a number'),
    handleValidationErrors
]
    
module.exports = validateFoodInput;