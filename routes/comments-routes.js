const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const Comment    = require('../models/Comment');
const User       = require('../models/User');

router.get('/comments', (req, res, next) => {
  Comment.find()
  .then(()=>{
      res.render('comments/new-comment')
  })
  .catch((err)=>{
      next(err);
  })
});

router.post('/comments/create', (req, res, next)=>{
  if(!req.user) {
      req.flash("error", "You must be logged in to post! Not a member? Sign up!");
      res.redirect("/login");
  }
  const newComment = req.body;
  newComment.author = req.user._id;
    Comment.create(newComment)
    .then((comment)=>{
        User.findByIdAndUpdate(req.user._id, {$push: {comments: comment._id}})
        .then(updatedUser => {
            console.log("the updated user info with review added to user reviews --------- ", updatedUser);
            res.redirect('/reviews');
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