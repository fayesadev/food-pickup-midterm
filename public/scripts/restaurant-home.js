/********** GLOBAL VARIABLES **********/

const userOrder = JSON.parse(localStorage.getItem("userOrder"));
const d = new Date();
const orderTime = d.toLocaleTimeString();
const socket = io();
let uniqueId = 0;

/********** APPEND ORDER REQUESTS **********/
const existingOrders = JSON.parse(localStorage.getItem("orderList")) || [];

const appendOrders = () => {
  // Check to see if userOrder is null AND it doesn't exist in existingOrders already
  let exists = false;
  if (userOrder !== null) {
    existingOrders.forEach((order) => {
      const uid = `${order.name}-${order.tel}`;
      const userOrderId = `${userOrder.name}-${userOrder.tel}`;
      if (uid === userOrderId) {
        exists = true;
      }
    });
    if (exists === false) {
      existingOrders.push(userOrder);
      localStorage.setItem("orderList", JSON.stringify(existingOrders));
    }
  }

// Chcek to see if the existing order has already been completed
  existingOrders.forEach((i) => {
    if (i.finished === true) {
      return;
    }

// Chceck to see if there is a time set onto the order
    if (typeof i.time !== "undefined") {
      addToProcessedOrders(i, uniqueId);
      uniqueId++;
      return;
    }

    uniqueId++;
    createRequestElement(i, uniqueId);
  });
};

/*********** PENDING ORDER REQUESTS **********/
//Creates HTML markup of pending request with time estimate input form
const createRequestElement = function (orderObj, id) {
  const name = orderObj.name;
  const customRequest = orderObj.message;
  const meals = mealList(orderObj.order);

  const markup = `
    <section id="${id}-order-request-container" class="new-order-request">
        <header class="request-text">
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul style="list-style: none;" class="request-text">
          ${meals}
        </ul>
        <label class="request-text">Additional comments</label>
        <p class="request-text">${customRequest}</p>
        <form class="timeEstimate request-text">
          <label for="timeEstimate">How much time will this order take?</label>
          <input id="${id}-input" name="timeEstimate" placeholder="Enter Time Estimate"></input>
          <span class="error">Please enter a valid time</span>
          <button id="${id}-btn" class="btn-submit" type="button">Confirm Request</button>
        </form>
        <div>
        <hr class="underline" />
      </div>
      </section>`;

  $("#pending-requests-container").append(markup);

  $(`#${id}-btn`).click(function (e) {
    if ($(`#${id}-input`).val().length === 0 || isNaN($(`#${id}-input`).val())) {
      alert('Please enter a valid time.');
      return;
    }
    addToProcessedOrders(orderObj, id);
    $("#initial-order").slideUp();
    $("#order-estimate").slideDown();
    $(`#${id}-order-request-container`).hide(100);

    // Set time to the current order
    orderObj.time = $(`#${id}-input`).val();
    localStorage.setItem("orderList", JSON.stringify(existingOrders));
    socket.emit("time", $(`#${id}-input`).val());
    $.post("/sms/orderTime", { time: $(`#${id}-input`).val() });
  });
};

/*********** ORDER REQUESTS **********/
const addToProcessedOrders = (orderObj, id) => {
  const name = orderObj.name;
  const customRequest = orderObj.message;
  const meals = mealList(orderObj.order);
  const markup = `
    <section id="${id}-order-confirmed-container" class="current-order grow">
      <header>
        <h3>${name}</h3>
        <h3>${orderTime}</h3>
      </header>
        <ul>
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>

        <form>
          <button id="${id}-btn-confirm" class="btn-submit" type="button">Order Complete</button>

        </form>
      <div>
        <hr class="underline" />
      </div>
    </section>`;

  $("#current-orders-container").append(markup);

  $(`#${id}-btn-confirm`).click(function (e) {
    $(`#${id}-order-confirmed-container`).hide(100);

    // Set order status as finished for the current object
    orderObj.finished = true;
    localStorage.setItem("orderList", JSON.stringify(existingOrders));


    socket.emit("complete", "awesome!");
    $.get("/sms/completed");
  });
};

//Returns HTML markup of meal and quantity list passed in an object (used for pending orders and processed orders)
const mealList = function (mealObj) {
  let string = "";
  const mealList = Object.values(mealObj);

  for (const meal of mealList) {
    string += `<li>${meal.id} x ${meal.qty}</li>`;
  }
  return string;
};

// appendOrderHistory(userOrder);

$(document).ready(function (event) {
  // Add all existing orders on page load
  appendOrders();

  // Add individual new orders whenever cart is submitted
  socket.on("sentNewOrder", () => {
    uniqueId++;

    const newOrder = JSON.parse(localStorage.getItem("userOrder"));
    existingOrders.push(newOrder);
    localStorage.setItem("orderList", JSON.stringify(existingOrders));
    createRequestElement(newOrder, uniqueId);

  });

  // if()

});
