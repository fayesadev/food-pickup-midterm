//make order object
let order = {};


// when add to cart is clicked, order object is updated and item is added to the cart
$(document).ready(function() {
  const removeCartItemButtons = $(".btn-danger");

  const removeCartItems = () => {
    for (const btn of removeCartItemButtons) {
      btn.addEventListener('click', (event) => {
        const btnClicked = event.target;
        btnClicked.parentElement.parentElement.remove();
      });
    }
  };

  removeCartItems();
});
//CALCULATE TOTAL: keeps count of cart total
//REMOVE ITEMS: when remove button is clicked, remove item from cart




//when proceed to checkout button is clicked, confirmation form pops up

//when confirm order is clicked, order object gets added to the orders table in db as a new row and customer table is also updated


//when qty is changed in cart, update order object. qty cannot exceed 99 or go below 0


//if no items in the cart, warning pups up if they click proceed to checkout
