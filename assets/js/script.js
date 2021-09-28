var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#city-input");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");
var cityNameEl = document.querySelector("#city-name");
var forecastEl = document.querySelector("#forecast-container");


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
    var weatherIcon = data.weather[0].icon;
    console.log(weatherIcon);
    var weatherIconEl = document.createElement("img");
    weatherIconEl.src = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
    console.log(weatherIconEl);
    cityNameEl.appendChild(weatherIconEl);

    cityNameEl.innerHTML = data.name + "<img src='https://openweathermap.org/img/wn/" + weatherIcon + ".png' />";
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
    var forecastDays = forecastEl.children;
    
    
    for (i = 0; i < forecastDays.length; i++) {
        var cardArr = forecastDays[i].children;
        for (j = 0; j < cardArr.length; j++) {
            switch (j) {
                case 0:
                    cardArr[j].textContent = "Date";
                    break;
                case 1:
                    cardArr[j].src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"
                case 2:
                    cardArr[j].textContent = "Temp: " + data.daily[i].temp.day + "\u00B0F";
                    break;
                case 3:
                    cardArr[j].textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
                    break;
                case 4:
                    cardArr[j].textContent = "Humidity: " + data.daily[i].humidity + "%";
                    break;
            }
        }
    }
};

searchFormEl.addEventListener("submit", getWeatherData);
