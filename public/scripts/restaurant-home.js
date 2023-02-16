/********** SAMPLE DATA OBJECTS **********/

const newRequest =
  [{
    id: 1,
    order: {
      Dummy: 1,
      MonkeyFuzz: 2,
      FuzzyMonk: 1,
    },
    name: "Donald Duck",
    number: 7801234567,
    order_time: "1:15pm",
    customRequest: "No peanuts pls",
    est_completion_time: 25,
  }];

const orders = [
  {
    id: 1,
    order: {
      "Roast Beef": 1,
      "Chicken Club": 2,
      "Philly Cheesesteak": 1,
    },
    name: "Robbie",
    number: 7801234567,
    order_time: "1:15pm",
    customRequest: "No peanuts pls",
    est_completion_time: 30,
  },
  {
    id: 2,
    order: {
      "Roast Beef": 2,
      "Chicken Club": 2,
      "Philly Cheesesteak": 2,
    },
    name: "Faye",
    number: 7801234567,
    order_time: "1:15pm",
    customRequest: "No peanuts pls",
    est_completion_time: 15,
  },
  {
    id: 3,
    order: {
      "Roast Beef": 1,
      "Chicken Club": 2,
      "Philly Cheesesteak": 3,
    },
    name: "Lauren",
    number: 7801234567,
    order_time: "1:15pm",
    customRequest: "No peanuts pls",
    est_completion_time: 12,
  },
];

/***********  HELPER FUNCTIONS **********/

//Returns HTML markup of meal and quantity list passed in an object
const mealList = function (mealObj) {
  let string = "";
  for (let meal in mealObj) {
    string += `<li class="request-text">${mealObj[meal]}x ${meal}</li>`;
  }
  return string;
};

//Encodes string to become safe HTML and prevent XSS
/*const escape = function(str) {
    let text = document.createElement("text");
    text.appendChild(document.createTextNode(str));
    return text.innerHTML;
  };*/

/********** PENDING ORDER REQUESTS SIDE BAR **********/

//Creates HTML markup of pending request with time estimate input form
const createRequestElement = function (orderObj) {
  const name = orderObj.name;
  const orderTime = orderObj.order_time;
  const customRequest = orderObj.customRequest;
  const meals = mealList(orderObj.order);

  const markup = `
    <section data-id=${orderObj.id} class="new-order-request">
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
          <label for="timeEstimate">How long will this order take?</label>
          <input name="timeEstimate" placeholder="Enter time estimate in minutes"></input>
          <span class="error">Please enter a valid time</span>
          <button class="btn-submit" type="submit">Confirm Request</button>
        </form>
      </section>`;

  return markup;
};

//Takes in array of order request objects and renders pending order request and appends to pending-requests-container
const renderRequests = function (orders) {
  for (let order of orders) {
    const $request = createRequestElement(order);
    $("#pending-requests-container").append($request);
  }
};

// const loadRequest = function () {
//   $.get("/restaurants", function () {
//     // Hardcoded loadRequest with dummy newRequest data to see it on the page
//     renderRequest(newRequest);
//   });
// };

/********** CURRENT ORDER DASHBOARD **********/

//Creates HTML markup of current order with order-fulfilled form button
const createOrderElement = function (orderObj) {
  const name = orderObj.name;
  // const number = customer.phone_number;
  const timeEstimate = orderObj.est_completion_time;
  const orderTime = orderObj.order_time;
  const customRequest = orderObj.customRequest;
  const meals = mealList(orderObj.order);

  const markup = `
    <section data-id=${orderObj.id} class="current-order">
        <header>
          <h3>${name}</h3>
          <div>
          <h3>${orderTime}</h3>
          <h4>${timeEstimate} min</h4>
          </div>
        </header>
        <ul>
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>
        <form class="completedOrder">
          <button type="submit" class="btn-fulfilled">Order Fulfilled!</button>
        </form>
      </section>`;

  return markup;
};

//For CSS testing and styling  purposes
//Renders current order request and appends to current-order-container
const renderOrders = function (currentOrder) {
  for (let order of currentOrder) {
    const $order = createOrderElement(order);
    $("#current-orders-container").append($order);
  }
};

//Appends one order to current order contianer passed in a single object array
const appendOrder = function(orderObj) {
  const order = orderObj[0];
  $("#current-orders-container").append(createOrderElement(order));
}

/********** JQUERY **********/

$(document).ready(function(event) {
  renderRequests(orders);
  renderOrders(orders);

  // Dummy button to append new requests to left contianer
  $("#dummybutton").click(function() {
    renderRequests(newRequest);
  });

  $(".requests").on("submit", ".timeEstimate", function(event) {
      event.preventDefault();

      if ($('input').val().length === 0) {
        event.stopImmediatePropagation();
        $('.error').slideDown().css("display", "flex").delay(2000).slideUp();
        return;
      }
      alert(`You submitted ${$('input').val()} minutes`);
      // alert($(this).serialize());
      $(this).parent().remove();
      appendOrder(newRequest);
    }
  );

  $(".orders").on("submit", ".completedOrder", function(event) {
    event.preventDefault();
    alert("you fulfilled this order!");

    $(this).parent().remove();
  })
});

// Copied Tweeter formatting to submit time estimate
// $('#time-estimate').submit(function(event) {
//   event.preventDefault();
//   const $text = $(this).serialize();
//   console.log($text);
//   $.post('/restaurants/requests', $text)
//   .then(()=>{
//     $('new-order-request').empty();
//   })
// });
