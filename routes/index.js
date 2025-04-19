const { layout } = require('ejs-mate')
const express= require('express')
const router=  express.Router()
const{ensureAuth, ensureGuest}= require('../middleware/auth')
const Story= require('../models/Story');

//desc landing page
//route /GET

router.get('/', ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})

router.get('/dashboard', ensureAuth, async (req,res)=>{
       
    try {
        const stories= await Story.find({user:req.user.id}).lean()              //we use lean method to pass the object or user to the 
    res.render('dashboard',{name: req.user.firstName,stories})                        //template i.e. hbs template
    } catch (err) {
        console.error(err)
        res.render('error/500')

    }

})





module.exports= router