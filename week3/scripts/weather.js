// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

//     Build the API URL
//    - endpoint: weather
//    - lat/lon: Trier, Germany (49.75°N, 6.64°E)
//    - units: imperial (°F) or swap to metric for °C
//    - appid: your personal API key
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=497ccc3149964e7d965654cbe8c920bf';


//    Async fetch function with try/catch error handling
const apiFetch = async () => {
    try {
        const response = await fetch(url);      // make the request
        if (response.ok) {
            const data = await response.json(); // Convert response to JSON
            console.table(data);
            displayResults(data);
        } else {
            throw Error(await response.text()); // Server returned an error
        }
    } catch(error) {
        console.error("Failed to fetch current weather", error);
    }
}



// Display function; puts data into the HTML elements
function displayResults(data) {
    // data.main.temp => the current temperature number
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    
    // data.weather[0].icon  →  e.g. "10d" — used to build the image URL
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
    // data.weather[0].description  →  e.g. "light rain"
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}


// Call the function to kick everything off
apiFetch();