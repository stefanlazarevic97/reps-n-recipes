const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

const { requireUser, restoreUser } = require('../../config/passport')
const validateNutritionInput = require('../../validation/nutrition')

router.get('/day', restoreUser, async (req, res, next) => {
    try {
        const date = req.query.date;

        const dailyNutrition = req.user.nutrition.filter(nutritionItem => {
            const itemDate = new Date(nutritionItem.dateConsumed).toISOString().split('T')[0];
            return itemDate === date;
        });
        
        res.json(dailyNutrition);
    } catch(err) {
        next(err)
    }
});

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
            dateConsumed: req.body.dateConsumed,
            servings: req.body.servings
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
            nutritionItem.deleteOne();
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
