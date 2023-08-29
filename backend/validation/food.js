const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateFoodInput = [
    check('food')
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
        .exists({ checkFalsy: true })
        .withMessage('Calories cannot be empty')
        .isNumeric()
        .withMessage('Calories cannot be empty'),
    check('gramsCarbs')
        .exists({ checkFalsy: true })
        .withMessage('Carbs cannot be empty')
        .isNumeric()
        .withMessage('Carbs cannot be empty'),
    check('gramsFat')
        .exists({ checkFalsy: true })
        .withMessage('Fat cannot be empty')
        .isNumeric()
        .withMessage('Fat cannot be empty'),
    check('gramsProtein')
        .exists({ checkFalsy: true })
        .withMessage('Protein cannot be empty')
        .isNumeric()
        .withMessage('Protein cannot be empty'),
    check('dateConsumed')
        .exists({ checkFalsy: true })
        .withMessage('Date cannot be empty'),
    handleValidationErrors
]
    
module.exports = validateFoodInput;