const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');

const { requireUser } = require('../../config/passport')

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { isProduction } = require('../../config/keys');

router.get('/current', restoreUser, (req, res) => {
    if (!isProduction) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
    }

    if (!req.user) return res.json(null);

    res.json({
        user: {_id: req.user._id, username: req.user.username, email: req.user.email},
        healthData: req.user.healthData,
        nutritionData: req.user.nutrition,
        workouts: req.user.workouts
    });
})

router.post('/register', validateRegisterInput, async (req, res, next) => {
    const user = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }]
    });    
    
    if (user) {
        const err = new Error("Validation Error");
        err.statusCode = 400;
        const errors = {};
        
        if (user.email === req.body.email) {
            errors.email = "A user has already registered with this email";
        }

        if (user.username === req.body.username) {
            errors.username = "A user has already registered with this username";
        }
        
        err.errors = errors;
        return next(err);
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
            if (err) throw err;
            
            try {
                newUser.hashedPassword = hashedPassword;
                const user = await newUser.save();
                return res.json(await loginUser(user));
            } catch(err) {
                next(err);
            }
        })
    });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if (err) return next(err);
        
        if (!user) {
            const err = new Error('Invalid credentials');
            err.statusCode = 400;
            err.errors = { email: "Invalid credentials" };
            return next(err);
        }
        
        return res.json(await loginUser(user));
    })(req, res, next);
});

router.patch('/:id', requireUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findOneAndUpdate(
            { _id: id }, 
            { $set: req.body },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'Adding user data failed' });
        }

        return res.json(updatedUser);
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;

// 45WbvfoQ-ZZKp9j2NNbNmFrk-jUmJY8yW1Zs

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVkMzY4ZDIzMTMwYTljYmViMTc4NjAiLCJ1c2VybmFtZSI6Im5pY282NjYiLCJlbWFpbCI6ImNhcmxpZXIubmljaG9sYXNAZ21haWwuY29tIiwiaWF0IjoxNjkzMjcxMDcwLCJleHAiOjE2OTMyNzQ2NzB9.6XWdeCfzz3UAJZU1qD5l8usb0jsnLx_z_ehED1UoFJk