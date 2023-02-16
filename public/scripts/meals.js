//
// API CALL FOR MENU: Api to get menu, render the list on the page (1)
//
const loadMeals = (foodCategory) => {
  $.get(
    `https://free-food-menus-api-production.up.railway.app/${foodCategory}`
  ).then(function(res) {
    // console.log(res);
    renderMealList(res, foodCategory);
  });
};



//
// SELECT MEALS TO SHOW ON BROWSER (2)
//
const renderMealList = (meals, foodCategory) => {
  $(`#${foodCategory}`).empty();
  for (let i = 0; i <= 21; i++) {
    // -----Only render meals if they have an image(NO 404) ----- //
    $.get(meals[i].img)
      .then(function(res) {
        createMealItem(meals[i], foodCategory);
      })
      .catch(function(err) {
        if (i !== 0) {
          i--;
        }
      });
  }
};



//
// UPDATE MENU ITEMS: update ejs template (3)
//
const createMealItem = (meal, foodCategory) => {

  // ------ Format Item Name ------ //
  const mealWords = meal.id.replace(/-/g, " ").split(" ");
  const packIndex = mealWords.indexOf("pack");
  const kitIndex = mealWords.indexOf("kit");

  if (packIndex !== -1) {
    mealWords.splice(packIndex, mealWords.length - packIndex);
  }
  if (kitIndex !== -1) {
    mealWords.splice(kitIndex, mealWords.length - kitIndex);
  }

  const mealName = mealWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // ----- Format Item Price ----- //
  const revisedPrice = Math.floor(meal.price / 10) + 5.99;
  const formattedPrice = revisedPrice.toFixed(2);

  //  ----- Update ejs template ----- //
  const mealItem = $(`
    <article class="meal">
      <header class="meal-header>
        <div class="meal-name"><strong>${mealName}</strong></div>
        <div><img class="meal-image" src="${meal.img}"></div>
      </header>
      <footer class="meal-footer">
        <div class="price">
          <div><strong>Price:</strong></div>
          <div>$${formattedPrice}</div>
        </div>
        <button value="${meal.id}" id="${meal.id}" class="addtocart">
          <div><i class="fas fa-cart-plus"></i> ADD TO CART</div>
        </button>
      </footer>
    </article>
  `);

  $(`#${foodCategory}`).append(mealItem);

  //  ----- When specific meal is clicked, add it to order -----//
  $(`#${meal.id}`).click((e) => {
    const id = e.currentTarget.value;
    const order = JSON.parse(localStorage.getItem('order'));

    if (!order[id]) {
      order[id] = { id: meal.id, name: mealName, price: formattedPrice, qty: 1 };
    } else {
      return alert("item already selected");
    }

    localStorage.setItem("order", JSON.stringify(order));
    createCartElement(id);
    updateCartTotal();
  });
};


//
//CREATE CART ELEMENT: takes in menu item object, returns a cart <article>
//
const createCartElement = (id) => {
  const order = JSON.parse(localStorage.getItem('order'));

  //----- show item on browser in the cart -----//
  const $cartItem = $(
    `
      <div class="cart-row-" id="cart-row.${order[id].id}">
        <span class="cart-col-1 cart-column name" id="${order[id].id}">${order[id].name}</span>
        <span class="cart-col-2 cart-column price">$${order[id].price}</span>
        <div class="cart-col-3 cart-column qty">
          <input class="cart-col-3-input" id="update-cart-${order[id].id}" type="number" value="1" min="0" max="99">
          <button class="btn btn-danger" id="remove-cart-${order[id].id}" type="button">x</button>
        </div>
      `
  );

  $('.cart-items').append($cartItem);
  //----- add event listener to remove item from cart and local storage updates -----//
  $(`#remove-cart-${order[id].id}`)[0].addEventListener('click', (e) => {
    const btnClicked = e.target;
    const row = btnClicked.parentElement.parentElement;
    removeItemFromOrder(row);
  });

  //----- add event listener to update quantity and local storage updates -----//
  $(`#update-cart-${order[id].id}`)[0].addEventListener('change', (e) => {
    const item = e.target;
    const qty = $(item).val()[0];
    updateCartQuantity(id, qty);

  });

  return $cartItem[0];
};


//
//CALCULATE TOTAL: takes in id (string) of menu item and tracks cart total
//
const updateCartTotal = () => {
  const order = JSON.parse(localStorage.getItem('order'));
  console.log(order);
  const total = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.price * cur.qty);
  }, 0);

  $('.cart-total-price').html(total.toFixed(2));

  if ($('.cart-items').children().length === 0) {
    ($('.cart-container')).hide(100);
  } else {
    ($('.cart-container')).show(100);
  }
};


//
// UPDATE QTY: when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0
//
const updateCartQuantity = (id, numOfItems) => {
  const order = JSON.parse(localStorage.getItem('order'));
  order[id].qty = Number(numOfItems);
  localStorage.setItem('order', JSON.stringify(order));
  updateCartTotal();
};



//
// REMOVE ITEMS: when remove button is clicked, remove item from cart (front-end)
//
const removeItemFromOrder = (item) => {
  item.remove(); //remove html row from browser
  const order = JSON.parse(localStorage.getItem('order'));

  const id = $(item).attr('id').split('.')[1];
  delete order[id];

  localStorage.setItem('order', JSON.stringify(order));
  updateCartTotal();
};


//
// PROCEED TO CHECKOUT
//
$('.btn-checkout').click(function() {

  const order = JSON.parse(localStorage.getItem('order'));

  //----- count number of order items is > 0 -----//
  const numOfItems = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.qty);
  }, 0);
  if (numOfItems === 0) return alert("please select an item");

  //----- proceed to checkout if number of order items is > 0 -----//
  const form = $(`#confirmation-form`)[0];
  $(form).show(100);
});



//
// CANCEL CHECKOUT
//
$('.cancel').click(function() {
  const form = $(`#confirmation-form`)[0];
  $(form).hide(100);
});



//
// CONFIRM CHECKOUT
//
$('.confirm').click(function() {
  if ($('#name').val().length === 0 || $('#tel').val().length === 0) return;
  
  //----- proceed to checkout if number of order items is > 0 -----//
  const userOrder = {
    order: JSON.parse(localStorage.getItem('order')),
    name: $('#name').val(),
    tel: $('#tel').val(),
    message: $('#message').val()
  }
 
  localStorage.setItem("userOrder", JSON.stringify(userOrder));

  // send query to API
  // data includes userOrder object
  // conditional if success
  // catch error and send alert
  $.post('/orderDb', data, function (res) {
    console.log(data);
    const order = JSON.parse(localStorage.getItem('order'));
  })

  $.get('/sms/placed')
  socket.emit('newOrder', 'awesome!');
  //-----If the customer returns to the order page, the order button will be visible -----//
  const seeOrderBtn = $(`#see-order`)[0];
  $(seeOrderBtn).show(100);



});




//LOAD MEALS
$(document).ready(() => {
  const order = {};
  localStorage.setItem('order', JSON.stringify(order));

  loadMeals("our-foods");
  loadMeals("fried-chicken");
  loadMeals("sandwiches");
});

