// GET MENU ITEMS:
const loadMeals = (foodCategory) => {
  $.get(
    `https://free-food-menus-api-production.up.railway.app/${foodCategory}`
  ).then(function (res) {
    renderMealList(res, foodCategory);
  });
};

const renderMealList = (meals, foodCategory) => {
  $(`#${foodCategory}`).empty();
  for (const meal of meals) {
    $.get(meal.img)
      .then(function (res) {
        createMealItem(meal, foodCategory);
      })
      .catch(function (err) {
        console.log(err);
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
          <header>
            <img class="meal-image" src="${meal.img}">
            <div class="meal-name"><strong>${mealName}</strong></div>
            <div class="meal-description">${meal.dsc}</div>
          </header>
          <footer class="meal-footer">
            <div class="price">
              <div><strong>Price:</strong></div>
              <div>$${formattedPrice}</div>
            </div>
            <button value="${meal.id}"class="addtocart">
              <div><i class="fas fa-cart-plus"></i> ADD TO CART</div>
            </button>
          </footer>
        </article>
`);
  $(`#${foodCategory}`).append(mealItem);
};

$(document).ready(() => {
  loadMeals("sandwiches");
  loadMeals("fried-chicken");
  loadMeals("our-foods");
});

// UPDATE DB
