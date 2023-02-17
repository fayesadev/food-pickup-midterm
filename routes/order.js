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
  const createCustomer = (nameOfCustomer, num) => {
    const customerQueryStr = `
    INSERT INTO customers (name, phone_number)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const customerQueryValues = [nameOfCustomer, num];

    return db.query(customerQueryStr, customerQueryValues)
      .then((customerData) => {
        const customer = customerData.rows[0];
        console.log("customer data is", customer);
        return customer;
      });
  };

  const createOrder = (customerId, specialinstructions) => {
    const orderQueryStr = `
     INSERT INTO orders (customer_id, is_fulfilled, special_instructions)
     VALUES ($1, FALSE, $2)
     RETURNING *;
     `;

    const orderQueryValues = [customerId, specialinstructions];

    return db.query(orderQueryStr, orderQueryValues)
      .then((orderData) => {
        const order = orderData.rows[0];
        console.log("order data is", order);
        return order;
      });
  };

  const mealOrderConnector = (qty, mealId, orderId) => {
    const queryStr = `
     INSERT INTO order_meals (order_id, meal_id, meal_quantity)
     VALUES ($1, $2, $3)
     RETURNING *;
     `;

    const queryValues = [qty, mealId, orderId];

    return db.query(queryStr, queryValues)
      .then((data) => {
        const joinRow = data.rows[0];
        console.log("joinRow data is", joinRow);
        return joinRow;
      });
  };


  const createOrderMeals = (orderId, orderObj) => {
    Object.values(orderObj).forEach(mealObj => {
      const mealName = mealObj.name;
      const mealQuantity = mealObj.qty;
      const mealPrice = mealObj.price;
      const mealQueryStr = `
        INSERT INTO meals (name, price)
        VALUES ($1, $2)
        RETURNING *;
     `;

      const mealQueryValues = [mealName, mealPrice];

      db.query(mealQueryStr, mealQueryValues)
        .then((mealData) => {
          const meal = mealData.rows[0];

          mealOrderConnector(mealQuantity, meal.id, orderId);
        });
    });

  };


  router.post('/', (req, res) => {
    console.log('body:', req.body);
    createCustomer(req.body.name, req.body.tel)
      .then((customer) => {
        createOrder(customer.id, req.body.message)
          .then((order) => {
            createOrderMeals(order.id, req.body.order);
          });
      })
      .catch((err) => {
        console.log("customer creation failed:", err);
      });


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
