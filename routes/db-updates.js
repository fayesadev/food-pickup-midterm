/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const {getOrders} = 

router.post('/', (req, res) => {
  res.render('order-status');
}); 

router.post('/orderTime', (req,res) => {
  getOrders().then().catch();
  res.status(200).send('ok');
})

// query to get all orders
// query to create an order

module.exports = router;
