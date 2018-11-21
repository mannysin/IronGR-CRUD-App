const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const bcryptSalt = 10;

const passport   = require("passport");



router.get('/signup', (req, res, next) => {
  res.render('users/signup');
});

router.post('/signup', (req, res, next)=> {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  User.findOne({theUsername})
    if(theUsername !== null){
    // req.flash('errorMessage', 'sorry, that username is taken');
    // this is essentially equal to req.flash.error = 'sorry that username is taken'
    res.redirect('/signup')
    }
      const salt     = bcrypt.genSaltSync(bcryptSalt);
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
});

router.get('/login', (req, res, next)=> {
  res.render('users/login');
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