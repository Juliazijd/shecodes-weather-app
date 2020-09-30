function showCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }

  let currentTime = `${day} ${hour}:${minute}`;

  let currentMoment = document.querySelector("#current-time");
  currentMoment.innerHTML = currentTime;
}

function showCityTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature} `;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let city = cityInput.value;
  city = city.trim();
  city = city.toLowerCase();
  city = city[0].toUpperCase() + city.slice(1);
  let apiKey = "427b64eee1edb35b88796269421b55f1";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let heading = document.querySelector("#header-current");
  heading.innerHTML = `${city}`;
  axios.get(apiWeatherUrl).then(showCityTemperature);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheit = Math.round((18 * 9) / 5 + 32);
  temperature.innerHTML = `${fahrenheit} `;
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = Math.round(((64 - 32) * 5) / 9);
  temperature.innerHTML = `${celsius} `;
}

function showTempCurLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  let heading = document.querySelector("#header-current");
  currentTemperature.innerHTML = `${temperature} `;
  heading.innerHTML = `${city}`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "427b64eee1edb35b88796269421b55f1";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiWeatherUrl}`).then(showTempCurLocation);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

showCurrentTime();

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);

let cityForm = document.querySelector("#check-city-form");
cityForm.addEventListener("submit", showCity);

let tempCurLocation = document.querySelector("#current-location-button");
tempCurLocation.addEventListener("click", getPosition);

//function changeToFahrenheit(event) {
//  event.preventDefault();
// let celsiusTemperature = document.querySelector("#celsius-temperature");
//  let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
//  let fahrenheit = Math.round((18 * 9) / 5 + 32);
//  let celsiusTempOutput = document.querySelector("#celsius-temp-output");
//  celsiusTempOutput.innerHTML = `${fahrenheit}°F`;
//  fahrenheitTemperature.innerHTML = `°C`;
//}

//let temperature = document.querySelector("#temperature");
//temperature.addEventListener("click", changeToFahrenheit);
