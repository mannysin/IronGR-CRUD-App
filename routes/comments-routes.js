const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const Comment    = require('../models/Comment');
const User       = require('../models/User');

router.get('/:id/comments/new', (req, res, next) => {
  Review.findById(req.params.id)
  .then((review)=>{
      res.render('comments/new-comment', {review})
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/:id/comments/create', (req, res, next)=>{
  if(!req.user) {
      req.flash("error", "You must be logged in to post! Not a member? Sign up!");
      res.redirect("/login");
  }
  const newComment = req.body;
  newComment.author = req.user._id;
  newComment.review = req.params.id;
    Comment.create(newComment)
    .then((comment)=>{
      Review.findByIdAndUpdate(req.params.id, {$push: {comments: comment._id}})
      .then((user)=>{
        User.findByIdAndUpdate(req.user._id, {$push: {comments: comment._id}})
        .then(x => {
          res.redirect('/reviews');
        })
      })
            .catch((err)=>{
              next(err)
            })
      .catch((err) =>{
        next (err)
      })
  })
    .catch((err)=>{
        next(err)
    })
});

// router.get("/{{_id}}/comments/new", (req, res, next)=>{
//   Comment.find().populate('review')
//   .then((comment)=>{
//     res.render("comments/comment-index", {comment});
//   })
// })


module.exports = router;