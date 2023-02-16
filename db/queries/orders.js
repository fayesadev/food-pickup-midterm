const db = require("../connection");




// query to create an order
const insertCustomerIntoDb = (obj) => {
  const sql = `INSERT INTO customers (
    name, phone_number)
      VALUES($1, $2)
    
  `;
  return db.query(sql,[obj.1, obj.2]);
};

const insertRowsInOrdersDb = (obj) => {
  return db
  .query(`
  INSERT INTO orders (
    id, customer_id, special_instructions
  )
  VALUES (
    $1, (SELECT id FROM customers WHERE id= ????), $3
  )
  `, [obj.1, obj.2, obj.3])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const insertRowsInMealsDb = (obj) => {
  return db
  .query(`
  INSERT INTO meals`)
}



// query to get all orders (these are the inset statements e will need to start)
const getAllOrders = () => {
  //const sqlUser = 
  //outer.query(sql)
};









const getOrders = () => {
  return db
    .query(
      `SELECT orders.id as order_id, customers.name as customer , orders.order_time, meals.name as meal_item, order_meals.meal_quantity as quantity
  FROM meals
  JOIN order_meals ON meal_id = meals.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE customers.name = 'Faye Dumbrigue';`
    )
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getOrders };