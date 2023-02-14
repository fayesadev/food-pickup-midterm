// app.get('/restaurant', (req, res) => {
//   res.render('restaurant-home.ejs');
// });

const express = require('express');
const router  = express.Router();
const ordersQueries = require('../db/queries/orders');
//Need 2 post routes: entering time estimate submit and order fulfilled submit

router.get('/', (req, res) => {
  res.render('restaurant-home');
});

router.get('/orders', (req, res) => {
  ordersQueries.getOrders()
  .then((orders)=>{
    res.json(orders);
  })
})

module.exports = router;
