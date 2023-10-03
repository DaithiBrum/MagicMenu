























































































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