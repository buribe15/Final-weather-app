function displayTemp(response) {
  console.log(response.data);
  let tempElm = document.querySelector("#temperature");
  let cityElm = document.querySelector("#city");
  let descripElm = document.querySelector("#description");
  let windElm = document.querySelector("#wind");
  let humidityElm = document.querySelector("#humidity");
  tempElm.innerHTML = Math.round(response.data.main.temp);
  cityElm.innerHTML = response.data.name;
  descripElm.innerHTML = response.data.weather[0].description;
  windElm.innerHTML = Math.round(response.data.wind.speed);
  humidityElm.innerHTML = response.data.main.humidity;
}

let apiKey = "291898a720d9114bc4e6b079cf895e54";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
