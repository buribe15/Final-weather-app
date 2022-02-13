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

  tempElm.innerHTML = Math.round(response.data.main.temp);
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

let form = document.querySelector("#search-box");
form.addEventListener("submit", submitForm);

search("Seattle");
