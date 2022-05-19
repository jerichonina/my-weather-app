function formatDate(date){
    
    let currentHours = date.getHours();
    if (currentHours < 10) {
        currentHours = `0${currentHours}`;
    }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
    }
    
    let currentDate = date.getDate();
    let currentDay = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    
    let currentMonth = date.getMonth();
    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let day = days[currentDay];
    let month = months[currentMonth];

    return `${day}, ${month} ${currentDate}  ${currentHours}:${currentMinutes}` ; 
}


let li = document.querySelector("#date");
let currentTime = new Date();

li.innerHTML = formatDate(currentTime);

// Display weather condition
function showWeatherCondition(response) {
  console.log(response.data);
  
  let cityName = document.querySelector("#city");
  let cityTemperature = document.querySelector("#temperature");
  let cityWeatherDescription = document.querySelector("#weather-description");
  let cityHumidity = document.querySelector("#humidity");
  let cityWind = document.querySelector("#wind");
  let cityFeelsLike = document.querySelector("#feels-like");
  let cityPressure = document.querySelector("#pressure");
  let weatherWidget = document.querySelector("#weather-widget");
  
  getForecast(response.data.coord);
 
  celsiusTemperature = response.data.main.temp;
   
  cityName.innerHTML = response.data.name;
  cityTemperature.innerHTML = Math.round(celsiusTemperature);
  cityWeatherDescription.innerHTML = response.data.weather[0].description;
  cityHumidity.innerHTML = response.data.main.humidity;
  cityWind.innerHTML = response.data.wind.speed;
  cityFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  cityPressure.innerHTML = response.data.main.pressure;
  weatherWidget.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
  

  function getForecast(coordinates) { 
  console.log(coordinates)
  let apiKey = "fc81915063c1c948e13c1b9f6ba1e112";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);  
}
  
// Default city
function defaultCity (city) {
  let apiKey = "fc81915063c1c948e13c1b9f6ba1e112";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
  console.log(apiUrl);
}

// Display current city
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  defaultCity(city);
}


// °C / °F
function showFahrenheit(event) {
  event.preventDefault();
  let cityTemperature = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature* 9) / 5 + 32;
  cityTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius (event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

defaultCity ("Hong Kong");