/* A sample array of menu items, you can replace this with your own data */
var menuItems = [
    {name: "Cheeseburger", ingredients: ["beef", "cheese", "bread", "lettuce", "tomato"]},
    {name: "Salmon Salad", ingredients: ["salmon", "lettuce", "cucumber", "olive oil", "lemon"]},
    {name: "Peanut Butter Cookies", ingredients: ["peanut butter", "flour", "sugar", "eggs", "butter"]},
    {name: "Veggie Stir-Fry", ingredients: ["tofu", "soy sauce", "rice", "broccoli", "carrot", "onion"]},
    {name: "Cheese Pizza", ingredients: ["cheese", "tomato sauce", "bread", "oregano"]},
    {name: "Fruit Smoothie", ingredients: ["banana", "strawberry", "milk", "honey"]}
  ]; 
  
  
 
    // A function to generate a random menu based on the selected checkboxes
    function generateMenu() {
    // Get the checkboxes and the menu div
    var checkboxes = document.getElementsByName("food");
    var menu = document.getElementById("menu");
  
    // Clear the menu div
    menu.innerHTML = "";
  
    // Loop through the checkboxes and store the checked values in an array
    var checkedFoods = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedFoods.push(checkboxes[i].value);
      }
    }
  
    // Loop through the menu items and filter out the ones that contain the checked foods
    var filteredMenu = menuItems.filter(function(item) {
      // Check if any of the item's ingredients are in the checked foods array
      return !item.ingredients.some(function(ingredient) {
        return checkedFoods.includes(ingredient);
      });
    });
  
    // If the filtered menu is not empty, randomly pick one item and display it
    if (filteredMenu.length > 0) {
      var randomIndex = Math.floor(Math.random() * filteredMenu.length);
      var randomItem = filteredMenu[randomIndex];
      menu.innerHTML = "<p>Your random menu item is: " + randomItem.name + "</p>";
    } else {
      // If the filtered menu is empty, display a message
      menu.innerHTML = "<p>Sorry, there are no menu items that match your preferences.</p>";
    }
  }
  
  // Get the generate button and add a click event listener to call the generateMenu function
  var generateButton = document.getElementById("generate");
  generateButton.addEventListener("click", generateMenu);
  