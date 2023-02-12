const axios = require('axios');

document.addEventListener("DOMContentLoaded", () => {
  console.log("hi");
  return loadMeals();
});



// GET MENU ITEMS: use axios for api get request
const loadMeals = function() {
  console.log('hi');
  axios
    .get('https://free-food-menus-api-production.up.railway.app/sandwiches', {
      responseType: "json",
    })
    .then(function(res) {

      console.log(res.data);
    });
};














