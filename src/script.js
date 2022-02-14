function currentDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let tempElm = document.querySelector("#temperature");
  let cityElm = document.querySelector("#city");
  let descripElm = document.querySelector("#description");
  let windElm = document.querySelector("#wind");
  let humidityElm = document.querySelector("#humidity");
  let dateElm = document.querySelector("#date");
  let iconElm = document.querySelector("#icon");

  metricTemp = Math.round(response.data.main.temp);
  tempElm.innerHTML = metricTemp;
  cityElm.innerHTML = response.data.name;
  descripElm.innerHTML = response.data.weather[0].description;
  windElm.innerHTML = Math.round(response.data.wind.speed);
  humidityElm.innerHTML = response.data.main.humidity;
  dateElm.innerHTML = currentDate(response.data.dt * 1000);
  iconElm.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElm.setAttribute("alt", response.data.weather[0].description);
}

function search(location) {
  let apiKey = "291898a720d9114bc4e6b079cf895e54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function submitForm(event) {
  event.preventDefault();
  let citySearchElm = document.querySelector("#city-search");
  search(citySearchElm.value);
}

function displayImperial(event) {
  event.preventDefault();
  let imperialTemp = (metricTemp * 9) / 5 + 32;
  let tempElm = document.querySelector("#temperature");
  tempElm.innerHTML = Math.round(imperialTemp);
  metricLink.classList.remove("active");
  imperialLink.classList.add("active");
}

function displayMetric(event) {
  event.preventDefault();
  let tempElm = document.querySelector("#temperature");
  tempElm.innerHTML = metricTemp;
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
}

let form = document.querySelector("#search-box");
form.addEventListener("submit", submitForm);

let imperialLink = document.querySelector("#imperial");
imperialLink.addEventListener("click", displayImperial);

let metricLink = document.querySelector("#metric");
metricLink.addEventListener("click", displayMetric);

let metricTemp = null;

search("Seattle");
