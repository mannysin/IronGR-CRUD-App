const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const User       = require('../models/User');
const Comment    = require('../models/Comment');

router.get('/reviews', (req, res, next) => {
  Review.find()
    .then((allTheReviews)=>{
      res.render('reviews/review-index', {reviews: allTheReviews, error: req.flash("error")})
  })
  .catch((err)=>{
      next(err);
  })
});

router.get('/reviews/new', (req, res, next) => {
  Review.find()
    .then(()=>{
      res.render('reviews/new-review', {message: req.flash("error")})
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/review/create', (req, res, next)=>{
    if(!req.user) {
        req.flash("error", "You must be logged in to post! Not a member? Sign up!");
        res.redirect("/login");
    }
    const newReview = req.body;
    newReview.author = req.user._id;
      Review.create(newReview)
      .then((review)=>{
          User.findByIdAndUpdate(req.user._id, {$push: {reviews: review._id}})
          .then(updatedUser => {
              console.log("the updated user info with review added to user reviews --------- ", updatedUser);
              res.redirect('/reviews');
          })
      })
      .catch((err)=>{
          next(err)
      })
});

router.get('/reviews/new2', (req, res, next) => {
    Review.find()
      .then(()=>{
        res.render('reviews/newreviewfromapi', {message: req.flash("error")})
    })
    .catch((err)=>{
        next(err);
    })
  });
  
  router.post('/review/new2', (req, res, next)=>{
      if(!req.user) {
          req.flash("error", "You must be logged in to post! Not a member? Sign up!");
          res.redirect("/login");
      }
      const newReview = req.body;
      newReview.author = req.user._id;
        Review.create(newReview)
        .then((review)=>{
            User.findByIdAndUpdate(req.user._id, {$push: {reviews: review._id}})
            .then(updatedUser => {
                console.log("the updated user info with review added to user reviews --------- ", updatedUser);
                res.redirect('/reviews');
            })
        })
        .catch((err)=>{
            next(err)
        })
  });

router.get('/reviews/:ID', (req, res, next)=>{
    Review.findById(req.params.ID).populate('author').populate({path : 'comments', populate: {path: 'author'}})
    .then((theReview)=>{

        res.render('reviews/details', theReview)
    })
    .catch((err)=>{
        next(err);
    })
});

router.get('/reviews/:ID/edit', (req, res, next)=>{
    Review.findById(req.params.ID)
    .then((theReview)=>{
            if(!req.user._id.equals(theReview.author)) {
                req.flash("error", "You can only edit your own posts.");
                res.redirect("/reviews");
            }
        res.render('reviews/edit', {theReview: theReview})    
    })
    .catch((err)=>{
        next(err);
    })
});

router.post('/reviews/:ID', (req, res, next)=>{
    if(!req.user.ID) {
        req.flash("error", "You must be the author to edit a review!");
        res.redirect("/reviews");
        return
    }
    Review.findByIdAndUpdate(req.params.ID, {
        author: req.user._id,
        title: req.body.title,
        comment: req.body.comment
    })
    .then(()=>{
        res.redirect('/reviews');
    })
    .catch((err)=>{
        next(err);
    })
});

router.post('/reviews/:ID/delete', (req, res, next)=>{
    Review.findById(req.params.ID).populate('author')
    .then((theReview)=>{
        if(!req.user._id.equals(theReview.author)) {
            req.flash("error", "You can only delete your own posts!");
            res.redirect("/reviews");
            return
        }
    Review.findByIdAndRemove(req.params.ID).populate('author')
    .then((x)=>{
        res.redirect('/reviews')
        })   
    })
    .catch((err)=>{
        next(err);
    })


    
    .catch((err)=>{
        next(err);
    })
  });

module.exports = router;