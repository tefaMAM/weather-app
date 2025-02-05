const apiKey = '9301eb162259292d01de055052a79f81';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

const weatherImg = document.querySelector(".card .weather img");
const weatherTemp = document.querySelector(".card .weather .temp");
const weatherCity = document.querySelector(".card .weather .city");
const humidity = document.querySelector('.col .humidity .num');
const wind = document.querySelector('.col .wind .num');
const input = document.querySelector('.card .search input');
const btn = document.querySelector('.card .search button');
const errorMsg = document.querySelector('.error');
const weatherSection = document.querySelector('.weather');
const detailsSection = document.querySelector('.detils');

async function checkWeather(city = 'Giza') {
  try {
    let response = await fetch(apiUrl + `&appid=${apiKey}&q=${city}`);
    if (response.status === 404) {
      errorMsg.style.display = 'block';
      weatherSection.style.display = 'none';
      detailsSection.style.display = 'none';
    } else {
      const weatherData = await response.json();
      
      weatherCity.innerHTML = weatherData.name;
      weatherTemp.innerHTML = `${weatherData.main.temp}°C`;
      humidity.innerHTML = `${weatherData.main.humidity}%`;
      wind.innerHTML = `${weatherData.wind.speed} km/h`;
      
      const cloud = weatherData.weather[0].main;
      if (cloud === 'Clouds') {
        weatherImg.src = 'images/clouds.png';
      } else if (cloud === 'Clear') {
        weatherImg.src = 'images/clear.png';
      } else if (cloud === 'Drizzle') {
        weatherImg.src = 'images/drizzle.png';
      } else if (cloud === 'Rain') {
        weatherImg.src = 'images/rain.png';
      } else if (cloud === 'Snow') {
        weatherImg.src = 'images/snow.png';
      } else {
        weatherImg.src = 'images/default.png';
      }

      errorMsg.style.display = 'none';
      weatherSection.style.display = 'block';
      detailsSection.style.display = 'flex';
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

btn.addEventListener('click', () => {
  let city = input.value;
  checkWeather(city);
});
