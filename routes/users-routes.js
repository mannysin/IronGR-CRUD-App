const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');

const passport   = require("passport");
const flash      = require("connect-flash");
const session    = require("express-session");
const sessions   = require("sessions");


router.get('/signup', (req, res, next) => {
  res.render('users/signup', {error: req.flash("error")});
  console.log('Get route working fine')
});

router.post('/signup', (req, res, next)=> {
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  User.findOne({username: theUsername})
  .then((theUser)=> {
    
    console.log("this is also loading" + theUsername)
      if(theUser !== null){
        req.flash('error', "That username is really cool, but it's taken!")
        res.redirect('/signup')
      } else {

        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(thePassword, salt);
    
    User.create({
      username: theUsername, 
      password: hashPass,
      })
    .then(()=>{
      res.redirect('/profile');
    })
      .catch((err)=>{
        next(err);
    })  

        
      }
    })
  .catch((err)=> {
    next(err)
  })

});

router.get('/login', (req, res, next)=> {
  res.render('users/login', {error: req.flash("error")});
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/login");
})

router.get('/profile', (req, res, next)=>{
      res.render('users/profile');
})

module.exports = router;