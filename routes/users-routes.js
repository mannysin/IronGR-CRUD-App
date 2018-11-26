const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const passport   = require("passport");

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
      .then(()=>{
        res.redirect('/profile')
        //  passport.authenticate("local", {
        //   successRedirect: "/profile",
        //   failureRedirect: "/login",
        //   failureFlash: true,
        //   passReqToCallback: true
        // }));
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

router.get('/profile', (req, res, next)=>{
  res.render('users/profile');
})

// router.get('/:theID', (req, res, next)=>{
//   User.findById(req.params.theID)
//   res.render('users/profile');
// })
// User.findById(req.params.theID)

router.get('/edit-profile', (req, res, next)=>{
  res.render('users/edit-profile');
})

router.post('/:id/update', (req, res, next)=>{
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{
      res.redirect('/user/'+req.params.id);
  })
  .catch((err)=>{
      next(err)
  })
});

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/");
})

module.exports = router;