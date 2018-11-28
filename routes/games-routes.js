const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const User       = require('../models/User');
const Comment    = require('../models/Comment');
const igdb       = require('igdb-api-node').default;
const axios      = require('axios')

const client     = igdb(`${process.env.IGDB_API_KEY}`);

router.get('/games', (req, res, next) => {
  client.games({
    fields: '*', // Return all fields
    limit: 50, // Limit to 5 results
    offset: 0 // Index offset for results
}).then(response => {
  console.log(response.body);
  res.render('games/game-index', {games: response.body})
}).catch(error => {
    next(error);
});
})


router.get('/games/:ids', (req, res, next)=>{
  axios.get(`https://api-2445582011268.apicast.io/games/${req.params.ids}`)
  .then((response)=>{ 
    res.render('games/gameDetails', {oneGame: response.body})
  })
  .catch((err)=>{
    next(err)
  })
})



module.exports = router;