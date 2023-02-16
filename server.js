// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8080;
const app = express();
// const server = require('http').createServer(app);

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
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
// Note: Feel free to replace the example routes below with your own

const foodApiRoutes = require("./routes/food-api");
const orderStatusRoutes = require("./routes/order-status");
const restaurantRoutes = require("./routes/restaurant-home");
const smsRoutes = require("./routes/sms");
const dbRoutes = require("./routes/db-updates");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/", foodApiRoutes);
app.use("/order-status", orderStatusRoutes);
app.use("/send-order", dbRoutes);
app.use("/restaurants", restaurantRoutes);
app.use('/sms', smsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  // req.session.user_id = 1;
  res.render("index");
  // console.log(req.session.user_id);
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
  })

  socket.on('newOrder', (data) => {
    io.emit('sentNewOrder', data);
  })
});

io.listen(3000);
