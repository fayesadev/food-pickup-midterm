const axios = require('axios');





// GET MENU ITEMS: use axios for api get request
document.addEventListener("DOMContentLoaded", loadMeals());

const loadMeals = function() {
  //console.log('hi');
  axios
    .get('https://free-food-menus-api-production.up.railway.app/sandwiches', {
      responseType: "json",
    })
    .then(function(res) {

      console.log(res.data);
    });
};


// UPDATE MENU ITEMS: update ejs template

// UPDATE DB









