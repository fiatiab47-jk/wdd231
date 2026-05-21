// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const highTemp = document.querySelector('#high-temp'); 
const lowTemp = document.querySelector('#low-temp'); 
const humidity = document.querySelector('#humidity'); 
const sunrise = document.querySelector('#sunrise'); 
const sunset = document.querySelector('#sunset'); 
const forecastContainer = document.querySelector('#weather-forecast');



//     Build the API URL
//    - endpoint: weather
//    - lat/lon: Trier, Germany (5.56°N, -0.19°E)
//    - units: imperial (°F) or swap to metric for °C
//    - appid: your personal API key
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=5.56&lon=-0.19&units=metric&appid=497ccc3149964e7d965654cbe8c920bf';

const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=5.56&lon=-0.19&units=metric&appid=497ccc3149964e7d965654cbe8c920bf';

// Call the function to kick everything off
export async function loadWeather() {
    await getCurrentWeather();
    await getForecast();
}

//    Async fetch function with try/catch error handling
const getCurrentWeather = async () => {
    try {
        const response = await fetch(currentWeatherURL);      // make the request
        if (response.ok) {
            const data = await response.json(); // Convert response to JSON
            console.table(data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text()); // Server returned an error
        }
    } catch(error) {
        console.error("Failed to fetch current weather", error);
    }
}


// Display function; puts data into the HTML elements
function displayCurrentWeather(data) {
    // data.main.temp => the current temperature number
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    
    // data.weather[0].icon  →  e.g. "10d" — used to build the image URL
    // data.weather[0] is an array, so we use [0] to grab the first (usually)
    // only weather event 
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
    // data.weather[0].description  →  e.g. "light rain"
    // Grabs the human-readable description from the first weather event
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;

    // Weather Details
    highTemp.innerHTML = `${Math.round(data.main.temp_max)}&deg;C`;
    lowTemp.innerHTML = `${Math.round(data.main.temp_min)}&deg;C`;
    humidity.textContent = `${data.main.temp_max}%`;

    // Sunrise
    const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
    sunrise.textContent = sunriseTime.toLocaleTimeString('en-GH', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'GMT'
    });

    // Sunset
    const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);
    sunset.textContent = sunsetTime.toLocaleTimeString('en-GH', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'GMT'
    });
}


/*=====================================
    3-Day Forecast
======================================*/
async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
            throw new Error(`Forecast Error: ${response.status}`);
        }

        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Forecast fetch failed:', error);
    }
}

const displayForecast = (forecastData) => {
    forecastContainer.innerHTML = '';

    // picks one forecast per day at 12:00 PM
    const filteredData = forecastData.filter(item =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3);

    filteredData.forEach(day => {
        const date = new Date(day.dt_txt);

        const card = document.createElement('div');
        card.classList.add('forecast-card');

        card.innerHTML = `
        <h3>${date.toLocaleDateString('en-Us', { weekday: 'long' })}</h3>
        <p>${Math.round(day.main.temp)}&deg;C</p>
        `;

        forecastContainer.appendChild(card);
    });

}