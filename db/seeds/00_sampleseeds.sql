INSERT INTO customers (name, phone_number, is_owner)
VALUES ('Faye Dumbrigue', '7801234567', FALSE),
('Lauren Johnston', '7801112222', FALSE),
('Robbie Thomas', '1230987654', FALSE);

INSERT INTO orders (customer_id, est_completion_time, is_fulfilled, special_instructions)
VALUES (1, 20, FALSE, 'No peanuts pls'),
(2, 30, TRUE, 'No pickles'),
(3, 30, FALSE, 'Add ketchup packets');

INSERT INTO meals (name, thumbnail_photo_url, price)
VALUES ('Roast Beef', 'https://media.gettyimages.com/id/154964016/photo/roast-beef-sandwich.jpg?s=612x612&w=gi&k=20&c=7A0NBDU-KG3eEU4wGzQg1sRtHzDtrCXYJdwvJawDloQ=', 15),
('Chicken Club', 'https://thumbs.dreamstime.com/b/sandwich-27721955.jpg', 20),
('Philly Cheesesteak', 'https://media.istockphoto.com/id/452022555/photo/steak-and-cheese-sub.jpg?s=612x612&w=0&k=20&c=J6kPviWhprxWkJb58LWnw7gJ8fX7mB-bg09t-qr4yw8=', 18);

INSERT INTO order_meals (order_id, meal_id, meal_quantity)
VALUES (1, 2, 1),
(2, 1, 2),
(3, 3, 1);
