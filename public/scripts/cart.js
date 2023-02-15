//make order object
localStorage.setItem('order', JSON.stringify({
  1: {
    id: 1,
    name: 'hamburger',
    price: 10,
    qty: 0
  },
  3: {
    id: 3,
    name: 'fries',
    price: 5,
    qty: 0
  },
  2: {
    id: 2,
    name: 'shake',
    price: 15,
    qty: 0
  }
}));


// const addToCartBtns = [...document.querySelectorAll(".addtocart")];
// console.log(addToCartBtns);


//ADD ITEMS: when add to cart is clicked, add item to cart
// $(".addtocart").click((e) => {
//   const id = e.currentTarget.value;
//   if (order[id].qty > 0) {
//     return alert("item already selected");
//   }

//   order[id].qty += 1;
//   const $orderItem = createCartElement(id);
//   $('.cart-items')[0].prepend($orderItem);

//   addUpdateQuantityEventListener();
//   addRemoveItemsEventListener();
//   updateCartTotal();
// });

//CREATE CART ELEMENT: takes in menu item object, returns a cart <article>
const createCartElement = (id) => {
  const order = JSON.parse(localStorage.getItem('order'));
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
  $('.cart-items').prepend($cartItem);

  $(`#remove-cart-${order[id].id}`)[0].addEventListener('click', (e) => {
    const btnClicked = e.target;
    const row = btnClicked.parentElement.parentElement;
    removeItemFromOrder(row);
  });

  
  $(`#update-cart-${order[id].id}`)[0].addEventListener('change', (e) => {
    const id = e.target;
    console.log("hi",e.targetval());

    const qty = $(input).val()[0];
    updateCartQuantity(id, qty);
  });

  return $cartItem[0];
};


// REMOVE ITEMS: when remove button is clicked, remove item from cart (front-end)
const removeItemFromOrder = (item) => {
  item.remove(); //remove html row from browser

  const order = JSON.parse(localStorage.getItem('order'));
  const id = $(item).attr('id').split('.')[1];
  console.log("id:", id);
  order[id].qty = 0;
  localStorage.setItem('order',JSON.stringify(order));

  updateCartTotal();//will update item in the cart
};

// ADD EL TO UPDATE QTY
const addUpdateQuantityEventListener = () => {

  const inputFields = $(".cart-col-3-input");
  for (const input of inputFields) {

    input.addEventListener('change', (e) => {
      const id = $(e.target).parent().parent().children().attr('id')[0];
      const qty = $(input).val()[0];
      updateCartQuantity(id, qty);
    });

  }

};


// UPDATE QTY: when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0
const updateCartQuantity = (id, qty) => {
  order[id].qty = Number(qty);
  updateCartTotal();
};


//CALCULATE TOTAL: takes in id (string) of menu item and tracks cart total
const updateCartTotal = () => {
  const order = JSON.parse(localStorage.getItem('order'));
  const total = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.price * cur.qty);
  }, 0);
  console.log(total);
  $('.cart-total-price').html(total.toFixed(2));
};

//addRemoveItemsEventListener();

//PROCEED TO CHECKOUT: when button is clicked, confirmation form pops up, if no items in the cart, warning pops up


const proceedToCheckOut = () => {
  const numOfItems = Object.values(order).reduce((acc, cur) => {
    return acc + (cur.qty);
  }, 0);

  if (numOfItems === 0) {
    return alert("please select an item");
  }

};

$('.btn-btn-checkout').click(() => proceedToCheckOut());

