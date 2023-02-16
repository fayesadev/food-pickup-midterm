-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS meal_orders CASCADE;

CREATE TABLE meals (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  picture thumbnail_photo_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'Sandwich'
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  est_completion_time SMALLINT,
  order_time DEFAULT CURRENT_TIMESTAMP,
  is_fulfilled BOOLEAN NOT NULL DEFAULT false,
  special_instructions TEXT
);

CREATE TABLE meal_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  meal_quantity INTEGER NOT NULL DEFAULT 0;
);
