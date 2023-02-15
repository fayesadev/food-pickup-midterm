//Creates the order object from the api call - this object is used for the cart and restaurant backend
// function Meal(meal) {
//   this.id = meal.id;
//   this.name = meal.name;
//   this.qty = 0;
//   this.price = function() {
//     const converted = Math.floor(meal.price / 10) + 5.99;
//     return converted.toFixed(2);
//   }
// }

// const createOrderObject = (meal) => {
//   const revisedPrice = Math.floor(meal.price / 10) + 5.99;
//   const formattedPrice = revisedPrice.toFixed(2);
//   order[meal.id] = { id: meal.id, name: meal.name, price: formattedPrice, qty: 0 };
//   return order;
// };

// GET MENU ITEMS:
const loadMeals = (foodCategory) => {
  console.log(123);
  $.get(
    `https://free-food-menus-api-production.up.railway.app/${foodCategory}`
  ).then(function(res) {
    // console.log(res);
    renderMealList(res, foodCategory);
  });
};

const renderMealList = (meals, foodCategory) => {
  $(`#${foodCategory}`).empty();
  for (const meal of meals) {
    console.log(meals);

    $.get(meal.img)
      .then(function(res) {
        createMealItem(meal, foodCategory);
        console.log(meal.img);

        //const meal = new Meal(meal); //adds meal to order
      })
      .catch(function(err) {
        // console.log(err);
      });
  }
};

// UPDATE MENU ITEMS: update ejs template
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

  $(`#${meal.id}`).click((e) => {
    const id = e.currentTarget.value;

    const order = JSON.parse(localStorage.getItem('order'));
    console.log(order);
    if (!order[id]) {
      order[id] = { id: meal.id, name: mealName, price: formattedPrice, qty: 1 };
      localStorage.setItem("order", JSON.stringify(order));

    } else {
      return alert("item already selected");
    }


    const $orderItem = createCartElement(id);


    //addUpdateQuantityEventListener();
    // addRemoveItemsEventListener();
    updateCartTotal();
  });
};


$(document).ready(() => {
  loadMeals("brisket");
  loadMeals("fried-chicken");
  loadMeals("sandwiches");

});


