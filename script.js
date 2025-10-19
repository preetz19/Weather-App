const apiKey = "619b81ca280874372b64e36546447f14"; 

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Display temperature & weather
        document.getElementById("temp-div").innerHTML = `<p>${Math.round(data.main.temp)}°C</p>`;
        document.getElementById("weather-info").innerHTML =
            `${data.weather[0].description}<br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} m/s`;

        
        const icon = document.getElementById("weather-icon");
        icon.style.display = "block";
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        displayHourlyForecast(forecastData.list);

    } catch (error) {
        alert(error.message);
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyContainer = document.getElementById("hourly-forecast");
    hourlyContainer.innerHTML = ""; 

    for (let i = 0; i < 6; i++) {
        const forecast = hourlyData[i];
        const time = new Date(forecast.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const temp = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;

        const item = document.createElement("div");
        item.classList.add("hourly-item");

        item.innerHTML = `
            <p>${time}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
            <p>${temp}°C</p>
        `;

        hourlyContainer.appendChild(item);
    }
}
