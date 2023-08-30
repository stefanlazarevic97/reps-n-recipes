const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const { requireUser, restoreUser } = require('../../config/passport')
const validateNutritionInput = require('../../validation/nutrition')

// router.get('/', requireUser, async (req, res) => {
//     try {
//         const nutrition = await Nutrition.find({ consumer: req.user._id })
//             .populate('consumer', '_id username')
//         return res.json(nutrition)
//     } catch(err) {
//         return res.json([])
//     }
// })

router.post('/', restoreUser, validateNutritionInput, async (req, res, next) => {
    try {
        const newNutrition = {
            foodName: req.body.foodName,
            foodQuantity: req.body.foodQuantity,
            foodQuantityUnit: req.body.foodQuantityUnit,
            calories: req.body.calories,
            gramsCarbs: req.body.gramsCarbs,
            gramsFat: req.body.gramsFat,
            gramsProtein: req.body.gramsProtein,
            dateConsumed: req.body.dateConsumed
        }
        
        let currentUser = await User.findById(req.user._id);
        currentUser.nutrition.push(newNutrition);
        await currentUser.save();
        return res.json(currentUser);
    } catch(err) {
        next(err)
    }
})

module.exports = router;
