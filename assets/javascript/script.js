
var edApiKey = 'cb87a3ad2d2758cc23fc980f34800143';
var edApiId = '0779033c';
var allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

$(document).ready(function () {

    $('.Generate').on('click', function () {
        $("#Sun").children().not(':first').remove()
        $("#Mon").children().not(':first').remove()
        $("#Tue").children().not(':first').remove()
        $("#Wed").children().not(':first').remove()
        $("#Thu").children().not(':first').remove()
        $("#Fri").children().not(':first').remove()
        $("#Sat").children().not(':first').remove()

        getMondayRecipe()
    })

    // pulls random recipes from api
    function getMondayRecipe(recipe) {

        var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&mealType=Dinner&dishType=Main%20course&imageSize=REGULAR';

        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                for (var i = 0; i < allDays.length; i++) {

                    var randomNumber = Math.floor(Math.random() * data.hits.length);
                    var recipe = data.hits[randomNumber].recipe;
                    var dayOFWeek = document.getElementById(allDays[i]);
                    var resLabel = document.createElement('p');
                    var resImg = document.createElement('img');
                    var nutritionLabel = document.createElement('div');
                    nutritionLabel.classList.add('nutrition-label')

                    // adding nutrition labels 
                    nutritionLabel.innerHTML = `
                    <ul>Calories: ${Math.trunc(data.hits[randomNumber].recipe.calories)} </ul>
                    <ul>Protein: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.PROCNT.quantity)} </ul>
                    <ul>Carbs: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.CHOCDF.quantity)} </ul>
                    <ul>Fat: ${Math.trunc(data.hits[randomNumber].recipe.totalNutrients.FAT.quantity)} </ul>
                      `

                    //   link to recipe details
                    resLabel.textContent = data.hits[randomNumber].recipe.label;
                    resImg.setAttribute("src", data.hits[randomNumber].recipe.
                        images.REGULAR.url);
                    var contentString = "Click here for recipe";
                    var moreDetails = document.createElement("a")
                    moreDetails.href = data.hits[randomNumber].recipe.url;
                    moreDetails.innerHTML = (contentString);

                    dayOFWeek.appendChild(resLabel);
                    dayOFWeek.appendChild(resImg);
                    dayOFWeek.appendChild(moreDetails);

                    // loop for recipe ingredients
                    for (var j = 0; j < data.hits[1].recipe.ingredientLines.length; j++) {
                        var labelList = data.hits[1].recipe.ingredientLines[j];
                        var resIng = document.createElement('ul');

                        for (var j = 0; j < data.hits[randomNumber].recipe.ingredientLines.length; j++) {
                            var labelList = data.hits[randomNumber].recipe.ingredientLines[j];
                            var resIng = document.createElement('ul');
                            resIng.textContent = labelList;
                            dayOFWeek.appendChild(resIng);
                        }

                        dayOFWeek.appendChild(nutritionLabel)
                    }
                }
            })
    }

    // cocktail api and section
    var container = $('#cocktail')

    $('#cocktailButton').on('click', function () {
        $("#cocktail").children().remove()
        getCocktailRecipe();
    })

    // fetching random cocktail recipe
    function getCocktailRecipe() {
        var cocktailAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

        fetch(cocktailAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Check if the data has drinks and pick the first one
                if (data && data.drinks && data.drinks.length > 0) {
                    let drink = data.drinks[0];

                    // Create elements for the drink name, image, link and ingredients list
                    let drinkName = document.createElement('p1');
                    let drinkImg = document.createElement('img');
                    let drinkLink = document.createElement('a');
                    let drinkIngredients = document.createElement('li');
                    let drinkInstructions = document.createElement('p2');

                    drinkName.textContent = drink.strDrink;
                    drinkInstructions.textContent = drink.strInstructions;
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
                    container.append(drinkInstructions);
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

