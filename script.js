const form = document.getElementById('weather-form');
const weatherResult = document.getElementById('weather-result');
const loader = document.getElementById('loader');

async function fetchWeather(location, unit) {
    const apiKey = '00f93d15357226894f41af846c57654a'; // Replace with your actual OpenWeather API key
    const unitParam = unit === 'Fahrenheit' ? 'imperial' : 'metric';  // Determine unit parameter
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitParam}&appid=${apiKey}`;

    try {
        loader.classList.remove('hidden');  // Show loader
        const response = await fetch(url);  // Fetch data from OpenWeather API
        if (!response.ok) {
            throw new Error('Location not found');  // Handle API error response
        }
        const data = await response.json();  // Parse the response as JSON
        displayWeather(data, unit);  // Display the fetched weather data
    } catch (error) {
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;  // Show error message
    } finally {
        loader.classList.add('hidden');  // Hide loader
    }
}

function displayWeather(data, unit) {
    const temp = Math.round(data.main.temp);  // Round temperature
    const conditions = data.weather[0].description;  // Get weather conditions
    const city = data.name;  // Get the city name
    const unitSymbol = unit === 'Fahrenheit' ? '°F' : '°C';  // Set the correct unit symbol

    weatherResult.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temp} ${unitSymbol}</p>
        <p>Conditions: ${conditions}</p>
    `;  // Update the weather result section
}

form.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent form submission from refreshing the page
    const locationInput = document.getElementById('location-input').value;  // Get user input location
    const unit = document.querySelector('input[name="unit"]:checked').value;  // Get selected unit radio button value
    fetchWeather(locationInput, unit);  // Call function to fetch weather
});
