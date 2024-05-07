// API key for OpenWeatherMap API (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = 'YOUR_API_KEY';

// Function to fetch weather data based on user's location
function fetchWeatherByLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeather(latitude, longitude);
    }, error => {
      console.error('Error getting location:', error);
      displayError('Error getting location. Please try again.');
    });
  } else {
    displayError('Geolocation is not supported by your browser.');
  }
}

// Function to fetch weather data based on user-inputted location
function fetchWeatherByInput(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch weather data');
      }
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      displayError('Error fetching weather data. Please try again.');
    });
}

// Function to display weather data
function displayWeather(data) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = `
    <p>Location: ${data.name}, ${data.sys.country}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}

// Function to display error message
function displayError(message) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = `<p>${message}</p>`;
}

// Fetch weather data based on user's location when the page loads
fetchWeatherByLocation();
