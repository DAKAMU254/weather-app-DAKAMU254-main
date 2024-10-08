const form = document.getElementById('weather-form');  
const weatherResult = document.getElementById('weather-result');  
const loader = document.getElementById('loader');  

async function fetchWeather(location, unit) {  
    const apiKey = 'YOUR_API_KEY'; // Replace with your Weather API key  
    const unitParam = unit === 'Fahrenheit' ? 'imperial' : 'metric';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitParam}&appid=${apiKey}`;  

    try {  
        loader.classList.remove('hidden');  
        const response = await fetch(url);  
        if (!response.ok) {  
            throw new Error('Location not found');  
        }  
        const data = await response.json();  
        displayWeather(data, unit);  
    } catch (error) {  
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;  
    } finally {  
        loader.classList.add('hidden');  
    }  
}  

function displayWeather(data, unit) {  
    const temp = Math.round(data.main.temp);  
    const conditions = data.weather[0].description;  
    const city = data.name;  
    const unitSymbol = unit === 'Fahrenheit' ? '°F' : '°C';  

    weatherResult.innerHTML = `  
        <h2>Weather in ${city}</h2>  
        <p>Temperature: ${temp} ${unitSymbol}</p>  
        <p>Conditions: ${conditions}</p>  
    `;  
}  

form.addEventListener('submit', (event) => {  
    event.preventDefault();  
    const locationInput = document.getElementById('location-input').value;  
    const unit = document.querySelector('input[name="unit"]:checked').value;  
    fetchWeather(locationInput, unit);  
});