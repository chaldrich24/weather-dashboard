var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#city-input");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");


var getWeatherData = function(event) {
    event.preventDefault();
    
    // Assign entered city to variable
    var city = searchInputEl.value.trim();
    city = city.toLowerCase();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5deff2594512a1498e8a3b274d78f399&units=imperial")
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayCurrentWeather(data, city);
        });
    });
};

var displayCurrentWeather = function(data, city) {
    currentTempEl.textContent = "Temp: " + data.main.temp + "\u00B0F";
};

searchFormEl.addEventListener("submit", getWeatherData);
