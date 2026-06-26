// Fetches and displays the visitor's local weather using :
// - navigator.geolocation   - gets the user's lat/lon
// - OpenWeatherMap API      - fetches current weather + 3day forecast
// - ES Module export        - loadWeather() is called from main.mjs
//================================================================= 

const API_KEY = '497ccc3149964e7d965654cbe8c920bf';


// DOM elements references
// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#current-weather-figcaption');

const highTemp = document.querySelector('#high-temp'); 
const lowTemp = document.querySelector('#low-temp'); 
const humidity = document.querySelector('#humidity'); 
const sunrise = document.querySelector('#sunrise'); 
const sunset = document.querySelector('#sunset'); 
const forecastContainer = document.querySelector('#weather-forecast');


// The only exported function
// main.mjs imports and calls this function
export async function loadWeather() {
    try {
        // If this fails (no geolocation Or user denies permission),
        // it triggers the catch block automatically
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`User location: lat=${lat}, lon=${lon}`);

        // If successful, fetch data for the user's actual location
        await fetchWeatherData(lat, lon);

    } catch (error) {
        // Falls back to Accra Weather if access denied
        // This triggers if "Browser does not support Geolocation" or "User denies access."
        console.warn(`Geolocation failed, using default location:`, error.message);
        await fetchWeatherData(5.56, -0.19);
    }
}

// Ask the browser for the visitor's current location
// This will show the browser's "Allow location prompt"
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        // Check if the browser has Geolocation feature
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported by this Browser!"));
        } else {
            // Request position; resolve if successful, reject if denied/failed
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    });
};



// Build the API URL using the provided coordinates in loadWeather()
// then calls both the current weather and forecast fetchers.
async function fetchWeatherData(lat, lon) {
    // builds the API URLs dynamically using the coordinates
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastURL       = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    await getCurrentWeather(currentWeatherURL);
    await getForecast(forecastURL);
}

// getCurrentWeather(url)
// Fetches the current weather from OpenWeatherMap.
// Uses try/catch for robust error handling.
// ======================================================
async function getCurrentWeather(url) { 
    try {
        // make the request
        const response = await fetch(url);

        // check if the server returned a successful response
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        // Convert response to JSON
        const data = await response.json();
        // Use for debugging in DevTools
        console.table(data);
        displayCurrentWeather(data);

    } catch (error) {
        console.error('Failed to fetch current weather:', error);
    }
};


//displayCurrentWeather(data)
// Takes the JSON response and put the values in the HTML.
// High ans low are intentionally excluded here - they are
// calculated more accurately inside getForecast() below.
// ==========================================================
function displayCurrentWeather(data) {
    // current temperature; Math.round removes decimals
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;

    // Weather icon; OpenWeatherMap provides an icon e.g. "10d"
    // We build the full image URL form it
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // data.weather[0].description  →  e.g. "light rain"
    // Grabs the human-readable description from the first weather event
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);

    // Weather description e.g. "light rain"
    // to uppercase on the first letter for a cleaner display
    // Capitalize the first letter of the description
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    // Humidity 
    humidity.textContent = `${data.main.humidity}%`;

    // Sunrise - the API returns Unix timestamp in seconds
    // Multiply by 1000 to convert to milliseconds fot JavaScript Date
    // data.timezone is the UTC offset in seconds for the location
    const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
    sunrise.textContent = sunriseTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });

    // Sunset - same approach as sunrise 
    const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);
    sunset.textContent = sunsetTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
} 



// Fetches the 3-day forecast form OpenWeatherMap.
// The forecast endpoint returns data every 3 hours (8 per day).
// We filter for 12:00 PM to get one reading per day.
// ===========================================================
async function getForecast(url) {
    try {
        const response = await fetch(url);
        // Check if server returned a successful response, throw a error if not found
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        // convert server response to JSON format
        const data = await response.json();

        // Get today's date as YYYY-MM-DD for filtering
        const today = new Date().toISOString().split('T')[0];

        // filter() gets all 3-hour entries that belong to today
        const todayEntries = data.list.filter(item =>
            item.dt_txt.startsWith(today)
        );

        // If today has entries, calculate true high and low
        // map() extracts just the temp from each entry
        // Math.max/min with spread finds the highest and lowest value
        if (todayEntries.length > 0) {
            const temps = todayEntries.map(item => item.main.temp);
            highTemp.innerHTML = `${Math.round(Math.max(...temps))}&deg;C`;
            lowTemp.innerHTML  = `${Math.round(Math.min(...temps))}&deg;C`;
        }

        // Pass the full list to displayForecast for the 3-day cards
        displayForecast(data.list);
    } catch (error) {
        console.error('Failed to fetch forecast:', error);
    }
}



// DisplayForecast(forecastData)
// Filters the forecast list for 12:00 PM entries
// takes the next 3 days, and builds a card for each
// Each card shows 4 properties: day, temp, icon, description.
// ============================================================
const displayForecast = (forecastData) => {
    // clear any previous content
    forecastContainer.innerHTML = '';

    // Get today's date as YYYY-MM-DD string
    // Used to exclude today from the forecast cards since
    //current weather is already displayed above
    const today = new Date().toISOString().split('T')[0];
    

    // filter() keeps only 12:00 PM entries that are NOT today
    // slice(0,3) takes just the first 3 results (every 3 next Days)
    const filteredData = forecastData.filter(
        item => item.dt_txt.includes('12:00:00') 
    
    ).slice(0, 3);

    // forEach() loops over the 3 days and builds a card for each
    filteredData.forEach(day => {
        const date = new Date(day.dt_txt);

        // Build the icon URL for this forecast entry
        const iconSrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;

        // data.weather[0].description  →  e.g. "light rain"
        let desc = day.weather[0].description;

        // Create the card for each day
        const card = document.createElement('div');
        card.classList.add('forecast-card');

        // Template literals builds the card HTML and displays
        // 4 properties: day name, icon, description, temperature
        card.innerHTML = `
        <h3>${date.toLocaleDateString('en-US', {weekday: 'long'})}</h3>
        <img src="${iconSrc}" alt="${desc}" width="50" height="50">
        <p class="forecast-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p class="forecast-temp">${Math.round(day.main.temp)}&deg;C</p>
        `;

        forecastContainer.appendChild(card);
    });
};

// loadWeather();