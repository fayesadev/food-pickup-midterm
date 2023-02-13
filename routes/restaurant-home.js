// app.get('/restaurant', (req, res) => {
//   res.render('restaurant-home.ejs');
// });

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('restaurant-home');
}); 

module.exports = router;