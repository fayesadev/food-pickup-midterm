//make order object


$(document).ready(function() {

  let order = {
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
  };

  //ADD ITEMS: when add to cart is clicked, add item to cart
  $(".addtocart").click((e) => {
    const id = e.currentTarget.value;
    if (order[id].qty > 0) {
      return alert("item already selected");
    }

    order[id].qty += 1;
    const $orderItem = createCartElement(id);
    $('.cart-items')[0].prepend($orderItem);

    addRemoveItemsEventListener();
    updateCartTotal();
  });


  //CREATE CART ELEMENT: takes in menu item object, returns a cart <article>
  const createCartElement = (obj) => {

    const $cartItem = $(
      `<article class="cart-items">
      <div class="cart-row">
        <span class="cart-col-1 cart-column name" id="${order[obj].id}">${obj.name}</span>
        <span class="cart-col-2 cart-column price">$${order[obj].price}</span>
        <div class="cart-col-3 cart-column qty">
          <input class="cart-col-3-input" type="number" value="${order[obj].qty}">
          <button class="btn btn-danger" type="button">x</button>
        </div>
      </article>`
    );

    return $cartItem[0];
  };

  //REMOVE ITEMS: when remove button is clicked, remove item from cart (front-end)
  const addRemoveItemsEventListener = () => {
    const removeCartItemButtons = $(".btn-danger");
    for (const btn of removeCartItemButtons) {
      btn.addEventListener('click', (e) => {
        const btnClicked = e.target;
        const row = btnClicked.parentElement.parentElement;
        removeItemFromOrder(row);
      });
    }
  };

  const removeItemFromOrder = (item) => {

    item.remove(); //remove html row from browser
    const id = $(item).children().first().attr('id')[0];

    order[id].qty = 0;
    updateCartTotal();//will update item in the cart
  };


  //CALCULATE TOTAL: takes in id (string) of menu item and tracks cart total
  const updateCartTotal = () => {
    const total = Object.values(order).reduce((acc, cur) => {
      return acc + (cur.price * cur.qty);

    }, 0);
    $('.cart-total-price').html(total.toFixed(2));
  };

  addRemoveItemsEventListener();
});





//when proceed to checkout button is clicked, confirmation form pops up

//when confirm order is clicked, order object gets added to the orders table in db as a new row and customer table is also updated


//when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0


//if no items in the cart, warning pups up if they click proceed to checkout

