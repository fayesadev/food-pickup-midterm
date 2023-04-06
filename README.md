Meat Hub - Restaurant Takeout App
=========

## Project Description

A restaurant takeout app that allows you to order food from a menu and track your order status. Also includes the restaurant side dashboard.
Tech Stack: Javascript, Node, Express, PostgreSQL, Web Sockets

## Screenshots

!["Screenshot of Landing Page"](https://github.com/robbiekthomas/food-pickup-midterm/blob/master/public/images/meathub1.png?raw=true)
!["Screenshot of Restaurant Side"](https://github.com/robbiekthomas/food-pickup-midterm/blob/master/public/images/meathub2.PNG?raw=true)
!["Screenshot of Order Status"](https://github.com/robbiekthomas/food-pickup-midterm/blob/master/public/images/meathub3%20.PNG?raw=true)
!["Screenshot of Loading Time"](https://github.com/robbiekthomas/food-pickup-midterm/blob/master/public/images/meathub4.png?raw=true)
!["Screenshot of Reviews"](https://github.com/robbiekthomas/food-pickup-midterm/blob/master/public/images/meathub5.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
