
var edApiKey = 'cb87a3ad2d2758cc23fc980f34800143';
var edApiId = '0779033c';
var allDays = ['Sun','Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat']

$(document).ready(function() {

    $('.Generate').on('click', function() {
        console.log('do you work');
        
        $("#Sun").children().not(':first').remove()
        $("#Mon").children().not(':first').remove()
        $("#Tue").children().not(':first').remove()
        $("#Wed").children().not(':first').remove()
        $("#Thu").children().not(':first').remove()
        $("#Fri").children().not(':first').remove()
        $("#Sat").children().not(':first').remove()

        getMondayRecipe()
    })

function getMondayRecipe(recipe) {
    // var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein';


    // var apiUrl = 'https:api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein&health=gluten-free&cuisineType=American&mealType=Dinner&imageSize=REGULAR';


    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR';

    fetch(apiUrl)
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data) {
        console.log(data);

        // var randomNumber = Math.floor(Math.random() * data.hits.length);
        // var recipe = data.hits[randomNumber].recipe;
        // console.log(recipe);

        for (var i = 0; i < allDays.length; i++) {

        var randomNumber = Math.floor(Math.random() * data.hits.length);
        var recipe = data.hits[randomNumber].recipe;
        console.log(recipe);

        var dayOFWeek = document.getElementById(allDays[i]);
      
        var resLabel = document.createElement('p');
        var resImg = document.createElement('img');
        var nutritionLabel = document.createElement('div');
        nutritionLabel.classList.add('nutrition-label')
          nutritionLabel.innerHTML = `
          <li>Calories: ${Math.trunc(data.hits[randomNumber].recipe.calories)} </li>
          <li>Protein: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.PROCNT.quantity)} </li>
          <li>Carbs: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.CHOCDF.quantity)} </li>
          <li>Fat: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.FAT.quantity)} </li>
          `

        resLabel.textContent = data.hits[randomNumber].recipe.label;

        resImg.setAttribute("src", data.hits[randomNumber].recipe.
        images.REGULAR.url);

        var contentString = "Click link for full recipe: ";
        var moreDetails = document.createElement("a")
        moreDetails.href = data.hits[randomNumber].recipe.url;
        moreDetails.innerHTML = (contentString + moreDetails.href);

        dayOFWeek.appendChild(resLabel);
        dayOFWeek.appendChild(resImg);
        dayOFWeek.appendChild(moreDetails);
        

        for (var j = 0; j < data.hits[randomNumber].recipe.ingredientLines.length; j++) {
            var labelList = data.hits[randomNumber].recipe.ingredientLines[j];
            var resIng = document.createElement('li');
            
            resIng.textContent = labelList;
        
            dayOFWeek.appendChild(resIng);
        }
        dayOFWeek.appendChild(nutritionLabel)


      }
        
      
      
        })  
    
}

var container = $('#cocktail')

$('#cocktailButton').on('click', function(){
    console.log('do you work');

    $("#cocktail").children().remove()

    getCityGrocery();
})
function getCityGrocery() {
    var cocktailAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(cocktailAPI)
    .then(function(response) {
        return response.json();
    })
        .then(function(data) {
          console.log(data);

          var randNumber = Math.floor(Math.random() * data.drinks.length);
          var drinkRecipe = data.drinks[randNumber].strInstructions;

          console.log(drinkRecipe);

          var drinkImg = document.createElement('img');
          drinkImg.setAttribute("src", data.drinks[randNumber].strDrinkThumb);
          container.append(drinkImg);
 
            container.append(`<p>Drink Name: ${data.drinks[randNumber].strDrink}</p>`);

            //loop for ingridient list

            // for (var h = 0; h < data.drinks[randNumber].strIngredient[h]; h++) {
            //     var cocktailLabelList = data.drinks[randNumber].recipe.ingredientLines[h];
            //     var cocktailIng = document.createElement('li');
                
            //     cocktailIng.textContent = cocktailLabelList;
            
            //     container.appendChild(cocktailIng);
            // }

            container.append(`<p>Alcoholic: ${data.drinks[randNumber].strAlcoholic}</p>`);
            container.append(`<p>Instructions: ${data.drinks[randNumber].strInstructions}</p>`);

        })
}    

});


// // example link with selections: 
// // https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein&health=gluten-free&cuisineType=American&mealType=Dinner&imageSize=REGULAR

// /* A sample array of menu items, you can replace this with your own data */
// var menuItems = [
//     {name: "Cheeseburger", ingredients: ["beef", "cheese", "bread", "lettuce", "tomato"]},
//     {name: "Salmon Salad", ingredients: ["salmon", "lettuce", "cucumber", "olive oil", "lemon"]},
//     {name: "Peanut Butter Cookies", ingredients: ["peanut butter", "flour", "sugar", "eggs", "butter"]},
//     {name: "Veggie Stir-Fry", ingredients: ["tofu", "soy sauce", "rice", "broccoli", "carrot", "onion"]},
//     {name: "Cheese Pizza", ingredients: ["cheese", "tomato sauce", "bread", "oregano"]},
//     {name: "Fruit Smoothie", ingredients: ["banana", "strawberry", "milk", "honey"]}
//   ]; 
  
  
 
//     // A function to generate a random menu based on the selected checkboxes
//     function generateMenu() {
//     // Get the checkboxes and the menu div
//     var checkboxes = document.getElementsByName("food");
//     var menu = document.getElementById("menu");
  

    // Clear the menu div


    //clear out existing data from days of the week

//     // Clear the menu div
//     menu.innerHTML = "";

  
//     // Loop through the checkboxes and store the checked values in an array
//     var checkedFoods = [];
//     for (var i = 0; i < checkboxes.length; i++) {
//       if (checkboxes[i].checked) {
//         checkedFoods.push(checkboxes[i].value);
//       }
//     }
  
//     // Loop through the menu items and filter out the ones that contain the checked foods
//     var filteredMenu = menuItems.filter(function(item) {
//       // Check if any of the item's ingredients are in the checked foods array
//       return !item.ingredients.some(function(ingredient) {
//         return checkedFoods.includes(ingredient);
//       });
//     });
  
//     // If the filtered menu is not empty, randomly pick one item and display it
//     if (filteredMenu.length > 0) {
//       var randomIndex = Math.floor(Math.random() * filteredMenu.length);
//       var randomItem = filteredMenu[randomIndex];
//       menu.innerHTML = "<p>Your random menu item is: " + randomItem.name + "</p>";
//     } else {
//       // If the filtered menu is empty, display a message
//       menu.innerHTML = "<p>Sorry, there are no menu items that match your preferences.</p>";
//     }
//   }
  
//   // Get the generate button and add a click event listener to call the generateMenu function
//   var generateButton = document.getElementById("generate");
//   generateButton.addEventListener("click", generateMenu);
 


