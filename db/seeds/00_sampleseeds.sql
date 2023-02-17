INSERT INTO customers (name, phone_number)
VALUES ('Faye Dumbrigue', '7801234567'),
('Lauren Johnston', '7801112222'),
('Robbie Thomas', '1230987654');

INSERT INTO orders (customer_id, est_completion_time, is_fulfilled, special_instructions)
VALUES (1, 20, FALSE, 'No peanuts pls'),
(2, 30, TRUE, 'No pickles'),
(3, 30, FALSE, 'Add ketchup packets');

INSERT INTO meals (name, price)
VALUES ('Roast Beef', 15),
('Chicken Club', 18);


