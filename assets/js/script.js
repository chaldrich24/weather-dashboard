var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#city-input");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");
var cityNameEl = document.querySelector("#city-name");


var getWeatherData = function(event) {
    event.preventDefault();
    
    // Assign entered city to variable
    var city = searchInputEl.value.trim();
    city = city.toLowerCase();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5deff2594512a1498e8a3b274d78f399&units=imperial")
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayCurrentWeather(data);
        });
    });
};

var displayCurrentWeather = function(data) {
    cityNameEl.textContent = data.name;
    currentTempEl.textContent = "Temp: " + data.main.temp + "\u00B0F";
    currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
    currentHumEl.textContent = "Humidity: " + data.main.humidity + "%";
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly&appid=5deff2594512a1498e8a3b274d78f399&units=imperial")
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            currentUvEl.textContent = "UV Index: " + data.current.uvi;
            displayDailyWeather(data);
        });
    });
};

var displayDailyWeather = function(data) {
    console.log(data);
};

searchFormEl.addEventListener("submit", getWeatherData);
