// API url with API key -> https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=4a727a43e8e7f8d3a04f2aa378bedb8d
//need to get lat & lon for city

const currentDay = dayjs().format("DD MMMM YYYY");
// let cityName;

// Search for a city
$("#search-button").click(() => {
  event.preventDefault();
  let cityName = $("#search-input").val();
  searchCity(cityName);

  //   console.log(cityName);
});

const searchCity = async (cityName) => {
  let cityResponse;
  //   const coordResponse = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityResponse.lat}&lon=${cityResponse.lon}&cnt=5&appid=4a727a43e8e7f8d3a04f2aa378bedb8d`

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4a727a43e8e7f8d3a04f2aa378bedb8d`
  )
    .then((response) => response.json())
    .then((data) => {
      cityResponse = data[0];
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityResponse.lat}&lon=${cityResponse.lon}&cnt=5&appid=4a727a43e8e7f8d3a04f2aa378bedb8d`
      )
        .then((response) => response.json())
        .then((data) => {
          currentWeather(data);
        });
    });
};

// function to get current day weather data
const currentWeather = (data) => {
  var myDate = data.dt * 1000;
  console.log(myDate);
  var weatherToday =
    "<div id='today'>" + "<h1>" + data.name + " " + myDate + "</h1>" + "</div>";
  //temp
  //wind
  //humidity
  $("#today").append(weatherToday);
};

// function to get 5 day forecast

const forecast = () => {};

// create array of previously searched cities
const topCities = [];

topCities.forEach((city) => {
  const cityBtn = "<button> " + city + " </button>";
  $("#history").append(topCities);
});
