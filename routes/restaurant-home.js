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


//Gather all data about current order and append to restaurant dashboard
// router.get('/orders', (req, res) => {
//   ordersQueries.getOrders()
//   .then((orders)=>{
//     res.json(orders);
//     console.log(orders);
//   })
// })

router.post('/requests', (req, res) => {
  console.log("req.body", req.body);
  res.redirect('/restaurants');
});

module.exports = router;
