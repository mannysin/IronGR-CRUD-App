const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcryptjs');
const passport   = require("passport");
const User       = require('../models/User');
const Review     = require('../models/Review');
const Comment    = require('../models/Comment');

router.get('/signup', (req, res, next) => {
  res.render('users/signup', {error: req.flash("error")});
  console.log('Signup get route working fine')
});

router.post('/signup', (req, res, next)=> {
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  User.findOne({username: theUsername})
  .then((theUser)=> {
    
    console.log('Signup post route working fine')
      if(theUser !== null){
        req.flash('error', "That username is really cool, but it's taken!")
        res.redirect('/signup')
      } else {

        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(thePassword, salt);
    
      User.create({
        username: theUsername, 
        password: hashPass,
        firstName: "I haven't edited",
        lastName: "my profile yet",
        avatar: "http://worldartsme.com/images/blue-lightning-bolt-clipart-1.jpg",
        bio: "I am technically a sheep to whoever made this because I haven't edited my information.",
        })
        .then((theUser)=>{
          req.login(theUser, (err) => {
            req.flash('error', 'To verify your account, please login.')
            res.redirect('/login')
            return;
          })
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
  successRedirect: `/profile/:id`,
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/profile/:id', (req, res, next)=>{
  User.findById(req.user.id).populate('reviews').populate('comments')
  .then(userFromDB => {
    res.render('users/profile', {theUser: userFromDB});
  })
  .catch(err => {
    next(err);
  })
})

router.get('/profile/:id/edit-profile', (req, res, next)=>{
  User.findById(req.user.id)
  .then(userFromDB => {
    res.render('users/edit-profile', {theUser: userFromDB});
  })
  .catch(err => {
    next(err);
  })
})

router.post('/:id/update', (req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{
      res.redirect('/profile/'+req.params.id);
  })
  .catch((err)=>{
      next(err)
  })
});

router.get('/logout', (req, res, next)=>{
  req.session.destroy((err) => {  
  res.redirect("/login");
  });
})

module.exports = router;