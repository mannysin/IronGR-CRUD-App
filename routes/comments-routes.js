const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const User       = require('../models/User');
const Comment    = require('../models/Comment');

// router.get('/reviews', (req, res, next) => {
//   Review.find()
//     .then((allTheReviews)=>{
//       res.render('reviews/review-index', {reviews: allTheReviews})
//   })
//   .catch((err)=>{
//       next(err);
//   })
// });


module.exports = router;