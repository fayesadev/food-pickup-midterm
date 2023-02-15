/********** SAMPLE DATA OBJECTS **********/

const newRequest = [
  {
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
  },
];

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
    string += `<li>${mealObj[meal]}x ${meal}</li>`;
  }
  return string;
};
/* Sample meal object
  let mealObj = {
    'Roast Beef': 1,
    'Chicken Club': 2,
    'Philly Cheesesteak': 1
  }
  console.log('mealList', mealList(mealObj));*/

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

//Mentor suggestion to render orders after clicking confirm request
function handleClick(id){
  console.log('ID=======>', id)
  // go through orders, find request by ID
  //push request object into orders array
  // then
  // need to call render function to rerender orders UI
}

  const markup = `
    <section data-id=${orderObj.id} class="new-order-request">
        <header>
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul>
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>
        <form class="timeEstimate">
          <label for="timeEstimate">How much time will this order take?</label>
          <input name="timeEstimate" placeholder="Enter Time Estimate"></input>
          <button class="btn-submit" type="submit">Confirm Request</button>
        </form>
      </section>`;

      //Mentor suggestion in calling the order object id to render the current order after submitting time estimate
      // $(".timeEstimate").on('submit', function (e) {
      //   e.stopPropagation()
      //   e.preventDefault()
      //   console.log('=================')
      //   // const id = $('.new-order-request').data('data-id')
      //   console.log('------->',orderObj.id)
      //   // handleClick(orderObj.id)
      // })
  return markup;
};

//Renders pending order request and appends to pending-requests-container
const renderRequest = function (orders) {
  for (let order of orders) {
    const $request = createRequestElement(order);
    $("#pending-requests-container").append($request);
  }
};

const loadRequest = function () {
  $.get("/restaurants", function () {
    // Hardcoded loadRequest with dummy newRequest data to see it on the page
    renderRequest(newRequest);
  });
};

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
        <form id="completed-order">
          <button type="submit" class="btn-fulfilled">Order Fulfilled!</button>
        </form>
      </section>`;

  return markup;
};

//Renders current order request and appends to current-order-container
const renderOrder = function (currentOrder) {
  for (let order of currentOrder) {
    const $order = createOrderElement(order);
    $("#current-orders-container").append($order);
  }
};
// Not sure if this is the correct function to load orders
// const loadOrder = function () {
//   $.get("/restaurants", function () {
//     renderOrder(newRequest);
//   });
// };

const appendOrders = function(orderObj) {
  $("#current-orders-container").append(createOrderElement(orderObj));
}
/********** JQUERY **********/

$(document).ready(function (event) {
  renderRequest(orders);
  renderOrder(orders);
  // loadRequest();
  // loadOrder();

  // Dummy button to append new requests to left contianer
  $("#dummybutton").click(function () {
    loadRequest();
  });

  $(".new-order-request").on("submit", ".timeEstimate",function (event) {
      event.preventDefault();

      alert("you submitted time!");
      const $request = $(this).parent();
      console.log("event", event);
      //This function appends the selected request to the current orders container, but is not good since it's not formatted to a 'current-order' format with a time estimate and still shows the time estimate form
      appendOrders(newRequest);

      $.post('/restaurants', $text)
      .then(()=> {
        renderOrder(newRequest);
      })
      .catch(err => {
        console.log(err);
      })
    }
  );
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
