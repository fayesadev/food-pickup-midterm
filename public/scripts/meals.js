$().ready(() => {
  $.get('https://free-food-menus-api-production.up.railway.app/sandwiches')
    .then(function(res) {
      console.log(res[0]);
    });
});

// GET MENU ITEMS: use axios for api get request


// UPDATE MENU ITEMS: update ejs template

// UPDATE DB









