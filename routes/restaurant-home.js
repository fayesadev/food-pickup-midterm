/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into /restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('restaurant-home');
}); 

module.exports = router;