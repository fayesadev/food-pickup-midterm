const progressBar = document.getElementsByClassName("progress-bar")[0];
const durationMin = 0.5;

setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  progressBar.style.setProperty("--width", width + 0.1);
}, durationMin * 60);

const createOrderEstimate = function (durationMin) {
  const orderMessage = $(`
  <h3 class="pickup-alert">Your order will be ready in ${durationMin} minutes!</h3>
  `);
  $("#pickup-alert").empty();
  $("#pickup-alert").append(orderMessage);
};

$(function () {
  $("#order-duration-button").click(function () {
    $("#initial-order").slideUp();
    $("#order-estimate").slideDown();
    createOrderEstimate(durationMin);
  });

  $("#order-complete-button").click(function () {
    $("#order-complete").slideDown();
    $("#order-estimate").slideUp();
  });
});
