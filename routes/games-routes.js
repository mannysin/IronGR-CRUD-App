const express    = require('express');
const router     = express.Router();
const Review     = require('../models/Review');
const User       = require('../models/User');
const Comment    = require('../models/Comment');
const igdb       = require('igdb-api-node').default;
const axios      = require('axios')

const client     = igdb(`${process.env.IGDB_API_KEY}`);

router.get('/games/:offset', (req, res, next) => {
  let prevOffset = Number(req.params.offset) - 50
  let nextOffset = Number(req.params.offset) + 50
  let showPrev = true;
  client.games({
    fields: '*', // Return all fields
    limit: 50, // Limit to 5 results
    offset: req.params.offset// Index offset for results
}).then(response => {
  console.log(response.body);
  if(prevOffset < 0){
    showPrev = false;
  }
  if(nextOffset > 1450) {
    nextOffset = false;
  }
  data = {
    games: response.body, 
    prev: prevOffset,
    next: nextOffset,
    showPrev: showPrev
  }
  res.render('games/game-index', data)
}).catch(error => {
    next(error);
});
})




// router.get('/games/details/:ids', (req, res, next)=>{
//   console.log("--------- ", req.params.ids);
//   axios.get(`https://api-2445582011268.apicast.io/games/${req.params.ids}`)
//   .then((response)=>{
//     client.games({}) 
//     .then(()=> {
//       res.render('games/gameDetails', {oneGame: response.body})
//     })  
//   })
//   .catch((err)=>{
//     next(err)
//   })
// })



module.exports = router;