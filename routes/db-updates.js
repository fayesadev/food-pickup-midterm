/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const {insertRowsInDb} = require('db/queries/orders.js') 

router.post('/', (req, res) => {
  res.render('order-status');
}); 

//
router.post('/orderDb', (req,res) => {
  // insertRowsInDb().then().catch();
  res.status(200).send('ok');
})



module.exports = router;
