// Search for a city
$("#search-button").click(() => {
  event.preventDefault();
  let cityName = $("#search-input").val();
  searchCity(cityName);
});

const searchCity = async (cityName) => {
  let cityResponse;

  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];
  recentSearches.push(cityName);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  recentCities();

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4a727a43e8e7f8d3a04f2aa378bedb8d`
  )
    .then((response) => response.json())
    .then((data) => {
      cityResponse = data[0];
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${cityResponse.lat}&lon=${cityResponse.lon}&exclude=hourly,minutely&appid=4a727a43e8e7f8d3a04f2aa378bedb8d&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          currentWeather(data.current, cityName);
          dailyForecast(data.daily.slice(1, 6));
        });
    });
};
// validation + catch errors
// styling

const currentWeather = (data, cityName) => {
  const date = dayjs.unix(data.dt).format(`D[/]MM[/]YYYY`);

  var weatherToday =
    "<div id='today'>" +
    "<h3>" +
    cityName +
    " " +
    date +
    "</h3>" +
    "<p> Temp: " +
    data.temp +
    " " +
    "Celsius" +
    "<p> Humidity: " +
    data.humidity +
    "%" +
    "<p> Wind speed: " +
    data.wind_speed +
    " km/h" +
    "</div>";
  $("#today").html(weatherToday);
};

// function to get 5 day forecast

const dailyForecast = (array) => {
  $("#forecast").empty();
  array.forEach((forecast, i) => {
    const date = dayjs.unix(forecast.dt).format(`D[/]MM[/]YYYY`);
    var dailyWeather =
      "<div id='daily-" +
      i +
      "'>" +
      "<h4> " +
      date +
      "</h4>" +
      "<p> Temp: " +
      forecast.temp.day +
      " " +
      "Celsius" +
      "<p> Humidity: " +
      forecast.humidity +
      "%" +
      "<p> Wind speed: " +
      forecast.wind_speed +
      " km/h" +
      "</div>";
    $("#forecast").append(dailyWeather);
  });
};

// create array of previously searched cities
const recentCities = () => {
  const localStorageSearches = JSON.parse(
    localStorage.getItem("recentSearches")
  );

  const city = localStorageSearches[localStorageSearches.length - 1];

  const cityBtn = `<button onclick="searchCity('${city}')"> ${city} </button> `;
  $("#history").append(cityBtn);
};
