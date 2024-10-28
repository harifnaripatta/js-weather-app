const apiKey = "befd984de4d3c050671d4eb935e6c660";
const loader = document.getElementById("loader");
const weatherDataDiv = document.getElementById("weatherData");
const errorDiv = document.getElementById("error");

document.getElementById("getWeather").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  loader.style.display = "block";
  weatherDataDiv.innerHTML = "";
  errorDiv.style.display = "none";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(`City not found: ${city}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorDiv.innerHTML = error.message;
    errorDiv.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}

function displayWeather(data) {
  const { main, weather, wind } = data;
  weatherDataDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}
