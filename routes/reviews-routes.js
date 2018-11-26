const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review')
const User       = require('../models/User');

router.get('/reviews', (req, res, next) => {
  res.render('reviews/review-index', {error: req.flash("error")});
  console.log('Review get route working fine')
});


module.exports = router;