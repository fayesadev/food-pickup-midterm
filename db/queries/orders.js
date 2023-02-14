const db = require('../connection');

const getOrders = () => {
  return db.query(`SELECT orders.id as order_id, customers.name as customer , orders.order_time, meals.name as meal_item, order_meals.meal_quantity as quantity
  FROM meals
  JOIN order_meals ON meal_id = meals.id
  JOIN orders ON order_id = orders.id
  JOIN customers ON customer_id = customers.id
  WHERE customers.name = 'Faye Dumbrigue';`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getOrders };
