$(document).ready(function() {
/**** Restaurant Orders ****/

  //Returns array of
  const mealArr = function(mealObj) {
    
  }

  //Encodes string to become safe HTML and prevent XSS
  const escape = function(str) {
    let text = document.createElement("text");
    text.appendChild(document.createTextNode(str));
    return text.innerHTML;
  };

  //Creates HTML markup of order passed in an object
  const createOrder = function(customer, order, meal, orderMeal) {
    const name = customer.name;
    // const number = customer.phone_number;
    // const timeEstimate = order.est_completion_time;
    const orderTime = order.order_time;
    const comments = escape(order.special_instructions);
    const mealName = meal.name;
    const quantity = orderMeal.meal_quantity;

    const markup = `
    <section class="new-order-request">
        <header>
          <h3>${name}</h3>
          <h3>${orderTime}</h3>
        </header>
        <ul>
          <li>1x Beef Tacos</li>
          <li>2x Guacamole & Chips</li>
          <li>1x Fish Tacos</li>
        </ul>
        <label>Additional comments</label>
        <p>${comments}</p>
        <form id="time-estimate" method="POST">
          <label for="submit-time-estimate">How much time will this order take?</label>
          <input name="submit-time-estimate" placeholder="Enter Time Estimate"></input>
          <button type="submit">Confirm Request</button>
        </form>
      </section>`

    return markup;
    }

//     <script>
//   let array = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];
//   for (let i = 0; i < array.length; i++){
//     let list = document.createElement('li');
//     list.innerText=array[i];
//     document.querySelector('#box').appendChild(list);
//   }
//  </script>

})


