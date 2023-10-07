const edApiId = '0779033c';
const edApiKey = 'cb87a3ad2d2758cc23fc980f34800143';
const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

$(document).ready(function () {

  $('.Generate').on('click', function () {
    console.log('do you work');

    // Remove all children except the first one for each day element
    for (let day of allDays) {
      $(`#${day}`).children().not(':first').remove();
    }

    // Get a recipe for each day
    for (let i = 0; i < allDays.length; i++) {
      getRecipe(allDays[i]);
    }
  })

  function getRecipe(day) {
    // Use a different query parameter for each day
    let query = '';
    switch (day) {
      case 'Sun':
        query = 'q=chicken';
        break;
      case 'Mon':
        query = 'cuisineType=Italian';
        break;
      case 'Tue':
        query = 'dishType=Salad';
        break;
      case 'Wed':
        query = 'diet=high-protein';
        break;
      case 'Thu':
        query = 'health=gluten-free';
        break;
      case 'Fri':
        query = 'mealType=Dinner';
        break;
      case 'Sat':
        query = 'dishType=Main%20course';
        break;
    }

    // Construct the API url with the query parameter
    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${edApiId}&app_key=${edApiKey}&${query}&imageSize=REGULAR`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // Check if the data has hits and pick a random one
        if (data && data.hits && data.hits.length > 0) {
          let randomNumber = Math.floor(Math.random() * data.hits.length);
          let recipe = data.hits[randomNumber].recipe;
          console.log(recipe);

          // Get the element for the current day
          let dayOFWeek = document.getElementById(day);

          // Create elements for the recipe label, image, link and nutrition label
          let resLabel = document.createElement('p');
          let resImg = document.createElement('img');
          let nutritionLabel = document.createElement('div');
          nutritionLabel.classList.add('nutrition-label')
          nutritionLabel.innerHTML = `
            <li>Calories: ${Math.trunc(recipe.calories)} </li>
            <li>Protein: ${Math.trunc(recipe.totalNutrients.PROCNT.quantity)} </li>
            <li>Carbs: ${Math.trunc(recipe.totalNutrients.CHOCDF.quantity)} </li>
            <li>Fat: ${Math.trunc(recipe.totalNutrients.FAT.quantity)} </li>
            `

          resLabel.textContent = recipe.label;

          resImg.setAttribute("src", recipe.images.REGULAR.url);

          let contentString = "Click link for full recipe: ";
          let moreDetails = document.createElement("a")
          moreDetails.href = recipe.url;
          moreDetails.innerHTML = (contentString + moreDetails.href);

          // Append the elements to the day element
          dayOFWeek.appendChild(resLabel);
          dayOFWeek.appendChild(resImg);
          dayOFWeek.appendChild(moreDetails);

          // Create and append elements for the ingredients list
          for (let ingredient of recipe.ingredientLines) {
            let resIng = document.createElement('li');

            resIng.textContent = ingredient;

            dayOFWeek.appendChild(resIng);
          }
          // Append the nutrition label
          dayOFWeek.appendChild(nutritionLabel)
        } else {
          // Handle the case when the data is empty or invalid
          console.error('No data or invalid data from the API');
        }
      })
      .catch(function (error) {
        // Handle the case when the fetch fails
        console.error('Fetch error: ' + error);
      })
  }

  //Create script for day-of-the-week buttons funtion to move about the display area for each day


  // Get all the buttons and sections
  var buttons = document.querySelectorAll(".buttons a");
  var sections = document.querySelectorAll("section.Mon, section.Tue, section.Wed, section.Thu, section.Fri, section.Sat, section.Sun");

  // Loop through each button
  buttons.forEach(function(button) {
    // Add a click event listener
    button.addEventListener("click", function(event) {
      // Prevent the default link behavior
      event.preventDefault();
      // Remove the active class from all buttons
      buttons.forEach(function(btn) {
        btn.classList.remove("is-active");
      });
      // Add the active class to the clicked button
      button.classList.add("is-active");
      // Get the target section id from the button href attribute
      var target = button.getAttribute("href");
      // Loop through each section
      sections.forEach(function(section) {
        // Check if the section id matches the target
        if (section.getAttribute("id") === target.slice(1)) {
          // Show the section
          section.style.display = "block";
        } else {
          // Hide the section
          section.style.display = "none";
        }
      });
    });
  });

  var container = $('#cocktail')

  $('#cocktailButton').on('click', function () {
    console.log('do you work');

    $("#cocktail").children().remove()

    getCityGrocery();
  })

  function getCityGrocery() {
    var cocktailAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(cocktailAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Check if the data has drinks and pick the first one
        if (data && data.drinks && data.drinks.length > 0) {
          let drink = data.drinks[0];
          console.log(drink);

          // Create elements for the drink name, image, link and ingredients list
          let drinkName = document.createElement('p');
          let drinkImg = document.createElement('img');
          let drinkLink = document.createElement('a');
          let drinkIngredients = document.createElement('ul');

          drinkName.textContent = drink.strDrink;

          drinkImg.setAttribute("src", drink.strDrinkThumb);

          drinkLink.href = `https://www.thecocktaildb.com/drink/${drink.idDrink}`;
          drinkLink.innerHTML = `Click here for more details`;

          // Loop through the properties of the drink object and find the ingredients and measures
          for (let key in drink) {
            if (key.startsWith('strIngredient') && drink[key]) {
              // Get the corresponding measure for the ingredient
              let measureKey = key.replace('strIngredient', 'strMeasure');
              let measure = drink[measureKey] || '';
              // Create and append an element for the ingredient and measure
              let drinkIng = document.createElement('li');
              drinkIng.textContent = `${measure} ${drink[key]}`;
              drinkIngredients.appendChild(drinkIng);
            }
          }

          // Append the elements to the container element
          container.append(drinkName);
          container.append(drinkImg);
          container.append(drinkLink);
          container.append(drinkIngredients);
        } else {
          // Handle the case when the data is empty or invalid
          console.error('No data or invalid data from the API');
        }
      })
      .catch(function (error) {
        // Handle the case when the fetch fails
        console.error('Fetch error: ' + error);
      })
  }
})

// Create recipe card to catch and display Menu variants such as allergy and prefereces
// Access web search global

var search_web = window.search_web

// Create a variable that stores the recipe data
// var recipe = search_web("vegan gluten-free pasta recipe"); // Pass a query string to the search_web tool

// Parse the JSON string and access the properties
try { // Use a try-catch block to handle any errors
  recipe = JSON.parse(recipe); // Parse the JSON string
  var name = recipe.name || "Unknown"; // Use a default value if name is undefined
  var ingredients = recipe.ingredients || []; // Use an empty array if ingredients is undefined
  var image = recipe.image || ""; // Use an empty string if image is undefined
} catch (error) {
  console.error(error); // Log any errors
}

// Select the HTML elements that you want to update
var cardHeader = document.getElementById("disRecipe").querySelector(".card-header-title");
var cardContent = document.getElementById("disRecipe").querySelector(".card-content");
var cardImage = document.getElementById("disRecipe").querySelector(".card-footer img");

// Update the innerHTML or src attributes of the selected elements
// cardHeader.innerHTML = name;
cardContent.innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join(""); // Use a map function to convert ingredients into a list
cardImage.src = image;


