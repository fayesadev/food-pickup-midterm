const socket = io();

// ---- REQUIRE IN ORDER ----- //

const userOrder = JSON.parse(localStorage.getItem("userOrder"));


// ---- STAR RATINGS ---- //

function ratingInput(currentStar) {
  const rating = currentStar.getAttribute("data-rating");
  const productId = currentStar.parentElement.getAttribute("data-productid");
  currentStar.setAttribute("data-clicked", "true");

  userOrder.order[productId].rating = rating;
}

// ---- ORDER STATUS FUNCTIONS ---- //
const durationMin = 0.5;
const createOrderEstimate = function (durationMin) {
  const orderMessage = $(`
  <h3 class="pickup-alert">Your order will be ready in ${durationMin} minutes!</h3>
  <div
  class="progress-bar"
  data-label="Preparing your order..."
  style="--width: 0"
></div>
  `);
  // ---- PROGRESS BAR ----- //
  $("#order-estimate").prepend(orderMessage);
  const progressBar = document.getElementsByClassName("progress-bar")[0];

  setInterval(() => {
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
    progressBar.style.setProperty("--width", width + 0.1);
  }, durationMin * 60);
};

const renderFoodRatings = function (data) {
  let ratings = Object.values(userOrder.order);
  for (const rating of ratings) {
    createRatingElement(rating);
  }
};

const createRatingElement = function (rating) {
  const mealRating = $(`
  <div class="food-item">
    <h4 class="food-name">${rating.name}</h4>
    
    <div class="ratings-wrapper">
      <div data-productid="${rating.id}" class="ratings">
        <span onclick="ratingInput(this)" data-rating="5">&#9733;</span>
        <span onclick="ratingInput(this)" data-rating="4">&#9733;</span>
        <span onclick="ratingInput(this)" data-rating="3">&#9733;</span>
        <span onclick="ratingInput(this)" data-rating="2">&#9733;</span>
        <span onclick="ratingInput(this)" data-rating="1">&#9733;</span>
      </div>
    </div>
  </div>
  `);
  $(".review-page").append(mealRating);
};

function submitReview() {
  const reviewThanks = $(`
  <h3 class="pickup-alert">Thanks for rating our food! <br>Hope to see you again :)</h3>
  <a class="home-button button" style="width: 180px;" href="/">Order Again</a>
  `);
  $("#order-review").empty();
  $("#order-review").append(reviewThanks);

  // localStorage.setItem("incomingData", JSON.stringify(incomingData));
  // const outgoingData = JSON.parse(localStorage.getItem("incomingData"));
  // console.log(outgoingData);
}

// ---- CLICK LISTENERS ---- //
$(function () {
  socket.on('sentTime', data => {
    $("#initial-order").slideUp();
    $("#order-estimate").slideDown();
    createOrderEstimate(data);
  })

 socket.on('sentComplete', data => {
  $("#order-complete").slideDown();
  $("#order-estimate").slideUp();
 })

  // $("#order-complete-button").click(function () {
    
  // });

  $("#review").click(function () {
    const reviewForm = $(`
      <h3 class="review-title">Rate your experience</h3>
      <article class="review-page"></article>
    `);

    const submitReview = $(`
      <button onclick="submitReview()" class="button home-button" id="submit-review">Submit Review</button>
    `);

    $("#order-review").append(reviewForm);
    renderFoodRatings(userOrder);
    $("#order-review").append(submitReview);
    $("#order-complete").empty();
  });
});
