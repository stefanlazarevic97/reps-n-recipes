const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const { requireUser, restoreUser } = require('../../config/passport')
const validateNutritionInput = require('../../validation/nutrition')

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

router.patch( "/:nutritionId", restoreUser, validateNutritionInput, async (req, res, next) => {
        try {
            const nutritionId = req.params.nutritionId;
            let currentUser = await User.findById(req.user._id);

            let nutritionItem = currentUser.nutrition.id(nutritionId);

            if (nutritionItem) {
                nutritionItem.set(req.body);
                await currentUser.save();
                return res.json(currentUser);
            } else {
                return res
                    .status(404)
                    .json({ message: "Nutrition item not found" });
            }
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:nutritionId", restoreUser, async (req, res, next) => {
    try {
        const nutritionId = req.params.nutritionId;
        let currentUser = await User.findById(req.user._id);

        let nutritionItem = currentUser.nutrition.id(nutritionId);

        if (nutritionItem) {
            nutritionItem.remove();
            await currentUser.save();
            return res.json(currentUser);
        } else {
            return res
                .status(404)
                .json({ message: "Nutrition item not found" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
