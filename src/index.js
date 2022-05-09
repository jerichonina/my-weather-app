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
  document.querySelector("#city").innerHTML =response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
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

defaultCity ("Hong Kong");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// °C / °F
function celsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");
  celsiusTemperature.innerHTML = 26;
}


function fahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#temperature");
  fahrenheitTemperature.innerHTML = Math.round((26 * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheit);
