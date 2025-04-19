const { layout } = require('ejs-mate')
const express= require('express')
const passport = require('passport');
const router=  express.Router()




//desc auth with google
//route /GET  auth/google
// Google login route


router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


// Google callback route
//get auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/' // On failure, redirect to login page
}), (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard after successful login
});

//logout user
// @route  /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);  // Pass error to the next middleware
        }
        res.redirect('/');  // Redirect to home page after logout
    });
});


module.exports= router