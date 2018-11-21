const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/secretpage', (req, res, next) => {
  res.render('secretpage');
});

module.exports = router;
