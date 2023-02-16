/********** GLOBAL VARIABLES **********/
const userOrder = JSON.parse(localStorage.getItem("userOrder"));
const d = new Date();
const orderTime = d.toString();
const socket = io();

/*********** PENDING ORDER REQUESTS **********/
//Creates HTML markup of pending request with time estimate input form
const createRequestElement = function (orderObj) {
  console.log(orderObj);
  const name = orderObj.name;
  const customRequest = orderObj.message;
  const meals = mealList(orderObj.order);

  const markup = `
    <section id="${orderObj.id}-order-request-container" class="new-order-request">
        <header>
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul style="list-style: none;" class="request-text">
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>
        <form class="timeEstimate">
          <label for="timeEstimate">How much time will this order take?</label>
          <input id="${orderObj.id}-input" name="timeEstimate" placeholder="Enter Time Estimate"></input>
          <button id="${orderObj.id}-btn" class="btn-submit" type="button">Confirm Request</button>
        </form>
      </section>`;

  $("#pending-requests-container").append(markup);

  $(`#${orderObj.id}-btn`).click(function (e) {
    if ($(`#${orderObj.id}-input`).val().length === 0) return;
    addToProcessedOrders(userOrder); 
    $("#initial-order").slideUp();
    $("#order-estimate").slideDown();
    ($(`#${orderObj.id}-order-request-container`)).hide(100);

    socket.emit('time', $(`#${orderObj.id}-input`).val());
    $.post('/sms/orderTime', {time: $(`#${orderObj.id}-input`).val()})
  });
};


/*********** ORDER REQUESTS **********/
const addToProcessedOrders = (orderObj) => {
  const name = orderObj.name; //good
  const customRequest = orderObj.message;

  const meals = mealList(orderObj.order);
  console.log("foo bar");
  const markup = `
    <section id="${orderObj.id}-order-confirmed-container" class="new-order-request">
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
          <button id="${orderObj.id}-btn-confirm" class="btn-submit" type="button">Order Complete</button>

        </form>
      </section>`;

      $("#current-orders-container").append(markup);
      
      $(`#${orderObj.id}-btn-confirm`).click(function (e) {
        ($(`#${orderObj.id}-order-confirmed-container`)).hide(100);

        socket.emit('complete', 'awesome!');
        $.get('/sms/completed');
      });
}

//Returns HTML markup of meal and quantity list passed in an object (used for pending orders and processed orders)
const mealList = function (mealObj) {
  let string = "";
  const mealList = Object.values(mealObj);

  for (const meal of mealList) {
    string += `<li>${meal.id} x ${meal.qty}</li>`;
  }
  return string;
};


/********** PENDING ORDER REQUESTS SIDE BAR **********/
// const loadRequest = function () {
//   $.get("/restaurants", function () {
//     // Hardcoded loadRequest with dummy newRequest data to see it on the page
//     renderRequest(userOrder);
//   });
// };



/********** CURRENT ORDER DASHBOARD **********/

//Renders current order request and appends to current-order-container
const renderOrders = function (currentOrder) {
  for (let order of currentOrder) {
    const $order = createOrderElement(order);
    $("#current-orders-container").append($order);
  }
};


$(document).ready(function (event) {
  createRequestElement(userOrder);
  renderOrder(userOrder);
  socket.emit('sentNewOrder', 'awesome!');
});
