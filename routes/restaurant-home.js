const express = require('express');
const router  = express.Router();
// const ordersQueries = require('../db/queries/orders');

const orders = {
  1: {
    id: 1,
    order: {
      'Roast Beef': 1,
      'Chicken Club': 2,
      'Philly Cheesesteak': 1
    },
    name: 'Robbie',
    number: 7801234567,
    order_time: '1:15pm',
    customRequest: 'No peanuts pls'
  },
  2: {
    id: 2,
    order: {
      'Roast Beef': 2,
      'Chicken Club': 2,
      'Philly Cheesesteak': 2
    },
    name: 'Faye',
    number: 7801234567,
    order_time: '1:15pm',
    customRequest: 'No peanuts pls'
  },
  3: {
    id: 3,
    order: {
      'Roast Beef': 1,
      'Chicken Club': 2,
      'Philly Cheesesteak': 3
    },
    name: 'Lauren',
    number: 7801234567,
    order_time: '1:15pm',
    customRequest: 'No peanuts pls'
  }
};

//Need 2 post routes: entering time estimate submit and order fulfilled submit

router.get('/', (req, res) => {
  res.render('restaurant-home');
});

// router.get('/requests', (req, res) => {

// })
//Gather all data about current order and append to restaurant dashboard
// router.get('/orders', (req, res) => {
//   ordersQueries.getOrders()
//   .then((orders)=>{
//     res.json(orders);
//     console.log(orders);
//   })
// })

router.post('/orders', (req, res) => {

  const timeEstimate = req.body.timeEstimate;

  orders[1].timeEstimate = timeEstimate;
  console.log("orders id 1", orders[1]);

  res.redirect('/restaurants');
});

// router.get('*', (req, res) => {
//   res.redirect('/restaurants');
// })

module.exports = router;
