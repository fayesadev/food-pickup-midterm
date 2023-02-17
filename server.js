// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;



const dbClient = require("./db/connection");

const app = express();

app.set("view engine", "ejs");


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
  })
);

// Separated Routes for each Resource
const foodApiRoutes = require("./routes/food-api");
const orderStatusRoutes = require("./routes/order-status");
const restaurantRoutes = require("./routes/restaurant-home");
const smsRoutes = require("./routes/sms");
const dbRoutes = require("./routes/db-updates");
const orderRoutesToDabase = require('./routes/order');


// Mount all resource routes
app.use("/", foodApiRoutes);
app.use("/order-status", orderStatusRoutes);
app.use("/send-order", dbRoutes);
app.use("/restaurants", restaurantRoutes);
app.use('/sms', smsRoutes);
app.use('/order', orderRoutesToDabase(dbClient));

// Note: mount other resources here, using the same pattern above

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("time", (data) => {
    console.log(data);
    io.emit("sentTime", data);
  });

  socket.on('complete',(data) => {
    io.emit('sentComplete', data);
  });

  socket.on('newOrder', (data) => {
    io.emit('sentNewOrder', data);
  });
});

io.listen(3000);
