var apiKey = 'cb87a3ad2d2758cc23fc980f34800143';
var apiId = '0779033c';

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
        
    })
    
}



});


// example link with selections: 
// https://api.edamam.com/api/recipes/v2?type=public&app_id=0779033c&app_key=cb87a3ad2d2758cc23fc980f34800143&diet=high-protein&health=gluten-free&cuisineType=American&mealType=Dinner&imageSize=REGULAR
