const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review')
const User       = require('../models/User');

router.get('/reviews', (req, res, next) => {
  Review.find()
    .then((allTheReviews)=>{
      res.render('reviews/review-index', {reviews: allTheReviews})
  })
  .catch((err)=>{
      next(err);
  })
});

router.get('/reviews/new', (req, res, next) => {
  Review.find()
    .then((allTheReviews)=>{
      res.render('reviews/new-review', {allTheReviews})
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/review/create', (req, res, next)=>{
      Review.create(req.body)
      .then(()=>{
          res.redirect('/reviews');
      })
      .catch((err)=>{
          next(err)
      })
});

router.get('/reviews/:ID', (req, res, next)=>{
    Review.findById(req.params.ID)
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
        res.render('reviews/edit', {theReview: theReview})    
    })
    .catch((err)=>{
        next(err);
    })
});

router.post('/reviews/:ID', (req, res, next)=>{
    Review.findByIdAndUpdate(req.params.ID, req.body)
    .then(()=>{
        res.redirect('/reviews/'+req.params.ID);
    })
    .catch((err)=>{
        next(err);
    })
});



module.exports = router;