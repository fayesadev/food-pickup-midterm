$(document).ready(function() {
/***********  HELPER FUNCTIONS **********/

//Returns HTML markup of meal and quantity list passed in an object
  const mealList = function(mealObj) {
    let string = '';
    for (let meal in mealObj) {
      string += `<li>${mealObj[meal]}x ${meal}<li> \n`;
    }
    return string;
  };
  /* Sample meal object
  let mealObj = {
    'Roast Beef': 1,
    'Chicken Club': 2,
    'Philly Cheesesteak': 1
  }
  console.log('mealList', mealList(mealObj)); */

  //Encodes string to become safe HTML and prevent XSS
  const escape = function(str) {
    let text = document.createElement("text");
    text.appendChild(document.createTextNode(str));
    return text.innerHTML;
  };

  /*Sample order object*/
  const sampleOrder = {
    order: {
      'Roast Beef': 1,
      'Chicken Club': 2,
      'Philly Cheesesteak': 1
    },
    name: 'Robbie',
    number: 7801234567,
    order_time: '1:15pm',
    customRequest: 'No peanuts pls'
  };
  const orders = [
    {
      order: {
        'Roast Beef': 1,
        'Chicken Club': 2,
        'Philly Cheesesteak': 1
      },
      name: 'Robbie',
      number: 7801234567,
      order_time: '1:15pm',
      customRequest: 'No peanuts pls'
    }, {
      order: {
        'Roast Beef': 1,
        'Chicken Club': 2,
        'Philly Cheesesteak': 1
      },
      name: 'Robbie',
      number: 7801234567,
      order_time: '1:15pm',
      customRequest: 'No peanuts pls'
    }
  ]

/********** PENDING ORDER REQUESTS SIDE BAR **********/

  //Creates HTML markup of pending request with time estimate input form
  const createRequestElement = function(orderObj) {
    const name = orderObj.name;
    // const number = customer.phone_number;
    // const timeEstimate = order.est_completion_time;
    const orderTime = orderObj.order_time;
    const customRequest = escape(orderObj.customRequest);
    const meals = mealList(orderObj.order);

    const markup = `
    <section class="new-order-request">
        <header>
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul>
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>
        <form id="time-estimate" method="POST">
          <label for="submit-time-estimate">How much time will this order take?</label>
          <input name="submit-time-estimate" placeholder="Enter Time Estimate"></input>
          <button type="submit">Confirm Request</button>
        </form>
      </section>`;

    return markup;
    };

  //Renders pending order request and appends to pending-requests-container
  const renderRequest = function(orderRequests) {
    for (let request of orderRequests) {
      const $request = createRequestElement(request);
      $('#pending-requests-container').append($request);
    };
  };

  // console.log('createOrder', createOrder(sampleOrder));

 /********** CURRENT ORDER DASHBOARD **********/

  //Creates HTML markup of current order with order-fulfilled form button
  const createOrderElement = function(orderObj) {
    const name = orderObj.name;
    // const number = customer.phone_number;
    // const timeEstimate = order.est_completion_time;
    const orderTime = orderObj.order_time;
    const customRequest = escape(orderObj.customRequest);
    const meals = mealList(orderObj.order);

    const markup = `
    <section class="current-order">
        <header>
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul>
          ${meals}
        </ul>
        <label>Additional comments</label>
        <p>${customRequest}</p>
        <form id="completed-order" method="POST">
        <button type="submit">Order Fulfilled!</button>
      </form>
      </section>`;

    return markup;
    };

  //Renders current order request and appends to current-order-container
  const renderOrder = function(currentOrder) {
    for (let order of currentOrder) {
      const $order = createOrderElement(order);
      $('#current-orders-container').append($order);
    }
  };
})


