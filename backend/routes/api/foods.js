const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Food = mongoose.model('Food')

const { requireUser } = require('../../config/passport')
const validateFoodInput = require('../../validation/food')

router.get('/', requireUser, async (req, res) => {
    try {
        const food = await Food.find({ consumer: req.user._id })
            .populate('consumer', '_id username')
        return res.json(food)
    } catch(err) {
        return res.json([])
    }
})

router.post('/', requireUser, validateFoodInput, async (req, res, next) => {
    console.log("inside post route")
    try {
        console.log("inside try block")
        const newFood = new Food({
            food: req.body.food,
            foodQuantity: req.body.foodQuantity,
            foodQuantityUnit: req.body.foodQuantityUnit,
            calories: req.body.calories,
            gramsCarbs: req.body.gramsCarbs,
            gramsFat: req.body.gramsFat,
            gramsProtein: req.body.gramsProtein,
            dateConsumed: req.body.dateConsumed,
            consumer: req.user._id
        })

        let food = await newFood.save();
        food = await food.populate('consumer', '_id username')
        return res.json(food);
        console.log("end of try block") 
    }
    catch(err) {
        next(err)
    }
})

router.patch('/:id', requireUser, validateFoodInput, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedFood = await Food.findOneAndUpdate(
            { _id: id, consumer: req.user._id }, 
            req.body,
            { new: true } 
        ).populate('consumer', '_id username');
        
        if (!updatedFood) {
            return res.status(404).json({ error: 'Food not found or unauthorized' });
        }

        return res.json(updatedFood);
    }
    catch(err) {
        next(err);
    }
});

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedFood = await Food.findOneAndDelete({
            _id: id,
            consumer: req.user._id
        });

        if (!deletedFood) {
            return res.status(404).json({ error: 'Food not found or unauthorized' });
        }

        return res.json({ message: 'Food successfully deleted', deletedFoodId: deletedFood._id });
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;