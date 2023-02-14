//make order object


$(document).ready(function() {

  let order = {
    hamburger: {
      id: 1,
      price: 10,
      qty: 0
    },
    pizza: {
      id: 3,
      price: 5,
      qty: 0
    },
    fries: {
      id: 2,
      price: 15,
      qty: 0
    }
  };

  //ADD ITEMS: when add to cart is clicked, add item to cart
  $(".addtocart").click((e) => {
    const btnId = e.currentTarget.value;
    order[btnId].qty += 1;
    $('.cart-items')[0].prepend("<p>Test</p>");
  });
  //REMOVE ITEMS: when remove button is clicked, remove item from cart
  const removeCartItemButtons = $(".btn-danger");
  const removeCartItems = () => {
    for (const btn of removeCartItemButtons) {
      btn.addEventListener('click', (e) => {
        const btnClicked = e.target;
        btnClicked.parentElement.parentElement.remove();
        updateCartTotal();
      });
    }
  };

  removeCartItems();

  //CALCULATE TOTAL: keeps count of cart total
  const updateCartTotal = () => {

    const cart = $('.cart-items')[0];
    //console.log("cart:",cart, cart.children);
    for (const item of cart.children) {
      //const priceElement = $(item).find('.price').text();
      let qty = $(item).find('.qty').find('input').val();

      const price = parseFloat($(item).find('.price').text().replace(/([^0-9\\.])/g,""));
      let x = Number($(item).find('.price').text());

      //console.log(qty);
    }
    //const items = $(".cart-container .cart-items .cart-row")[0];
    //console.log(items);
  };
});





//when proceed to checkout button is clicked, confirmation form pops up

//when confirm order is clicked, order object gets added to the orders table in db as a new row and customer table is also updated


//when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0


//if no items in the cart, warning pups up if they click proceed to checkout
