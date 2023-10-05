
//Kroger Grocery Button and Function

const apiKey = ""
var container = $('#krogerAds')

$('#groceryButton').on('click', function(){
    console.log('do you work');
    const city = $("#city").val();
    getCityGrocery(city);
})
function getCityGrocery(city) {
    var groceryUrl = "https://api.kroger.com/v1/" + city + apiKey;

    

    fetch(groceryUrl)
    .then(function(response) {
        return response.json();
    })
        .then(function(data) {

            container.append(`<p>weather: ${data.main.temp}</p>`);
            container.append(`<p>wind speed: ${data.wind.speed}</p>`);
            container.append(`<p>humidity: ${data.main.humidity}</p>`);
        })
        .then(function(){
            getFiveDay(city);
        })
}

// 
var edApiKey = 'cb87a3ad2d2758cc23fc980f34800143';
var edApiId = '0779033c';

$(document).ready(function() {
    var disRecipe = $('#disRecipe');

    $('#Monday').on('click', function() {
        console.log('do you work');
        getMondayRecipe()
    })

function getMondayRecipe(recipe) {
    // var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=' + apiId + '&app_key=' + apiKey;
    var apiUrl = 'https:api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein&health=gluten-free&cuisineType=American&mealType=Dinner&imageSize=REGULAR';


    fetch(apiUrl)
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data) {
        console.log(data);
        for (var i = 0; i < 8; i++) {

        // var recipe = Math.floor(Math.random(data.hits[i].recipe));
        // console.log(recipe);
        
  //         // Get random index from array of options
        var randomNumber = Math.floor(Math.random() * data.hits.length);
        var recipe = data.hits[randomNumber].recipe;
        console.log(recipe);

        //3. generate a random number
        //4. use random number to access the index 

        var dayOFWeek = document.getElementById('Mon');
        var resLabel = document.createElement('p');
        var resImg = document.createElement('img');
        var nutritionLabel = document.getElementById('nutrition-label');
    
        var resCalories = document.createElement('li');
        var resProtein = document.createElement('li');
        var resCarbs = document.createElement('li');
        var resFat = document.createElement('li');
       
        

        resLabel.textContent = data.hits[i].recipe.label;
        resCalories.textContent = ("Calories: " + data.hits[i].recipe.calories);
        resProtein.textContent = ("Protein: " + data.hits[i].recipe.totalNutrients.PROCNT.quantity);
        resCarbs.textContent = ("Carbs: " + data.hits[i].recipe.totalNutrients.CHOCDF.quantity);
        resFat.textContent = ("Fat: " + data.hits[i].recipe.totalNutrients.FAT.quantity);



        resImg.setAttribute("src", data.hits[i].recipe.
        images.REGULAR.url);

        nutritionLabel.appendChild(resCalories);
        nutritionLabel.appendChild(resProtein);
        nutritionLabel.appendChild(resCarbs);
        nutritionLabel.appendChild(resFat);
        dayOFWeek.appendChild(resLabel);
        dayOFWeek.appendChild(resImg);

        var contentString = "Click link for full recipe: ";
        var moreDetails = document.createElement("a")
        moreDetails.href = data.hits[i].recipe.url;
        moreDetails.innerHTML = (contentString + moreDetails.href);
        dayOFWeek.appendChild(moreDetails);
        
        

        for (var j = 0; j < data.hits[1].recipe.ingredientLines.length; j++) {
            var labelList = data.hits[1].recipe.ingredientLines[j];
            var resIng = document.createElement('li');
            
            resIng.textContent = labelList;
        
            dayOFWeek.appendChild(resIng);
        }

      }


        

        //for (var i = 0; i < data.length; i++) {
             
        })
       // .then(function(recipe) {
            
       // })
    
    
}



});


// example link with selections: 
// https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein&health=gluten-free&cuisineType=American&mealType=Dinner&imageSize=REGULAR

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
 
