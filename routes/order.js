const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // router.get('/', (req, res) => {

  //   db.query(`SELECT * FROM customers;`).then((data) => {
  //     console.log("data is", data.order);
  //     res.send("test route");
  //   })
  //     .catch((err) => {
  //       console.log(err);
  //       res.send("test route");
  //     });
  // });

  router.post('/', (req, res) => {
    console.log(req.body);
    const customerQueryStr = `
    INSERT INTO customers (name, phone_number, is_owner)
    VALUES ($1, $2, FALSE);
    `;
    const customerQueryValues = [];

    db.query(customerQueryStr, customerQueryValues)
      .then((customerData) => {
        console.log("data is", customerData);
      })
      .catch((err) => {
        console.log(err);
      });


      // const orderQueryStr = `
      // INSERT INTO orders (customer_id, est_completion_time, is_fulfilled, special_instructions)
      // VALUES ($1, $2, FALSE, $3);
      // `;
      // const orderQueryValues = [];
      // db.query(orderQueryStr, orderQueryValues).then((data) => {
      //   console.log("data is", data.order);

      // })


    return res.send("data posted");
  });

  return router;
};


// // query to create an order
// const insertCustomerIntoDb = (obj) => {
//   const sql = `INSERT INTO customers (
//     name, phone_number)
//       VALUES($1, $2)

//   `;
//   return db.query(sql,[obj.1, obj.2]);
// };

// // const insertRowsInOrdersDb = (obj) => {
// //   return db
//   .query(`
//   INSERT INTO orders (
//     id, customer_id, special_instructions
//   )
//   VALUES (
//     $1, (SELECT id FROM customers WHERE id= ????), $3
//   )
//   `, [obj.1, obj.2, obj.3])
//   .then((result) => {
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })
// };

// const insertRowsInMealsDb = (obj) => {
//   return db
//   .query(`
//   INSERT INTO meals`)
// }
