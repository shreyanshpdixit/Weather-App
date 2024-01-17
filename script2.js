const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

const getImagePath = (weatherMain) => {
    switch (weatherMain) {
        case 'Clear':
            return 'images/clear.png';
        case 'Rain':
            return 'images/rain.png';
        case 'Snow':
            return 'images/snow.png';
        case 'Clouds':
            return 'images/cloud.png';
        case 'Mist':
        case 'Haze':
            return 'images/Mist.png';
        default:
            return 'images/cloud.png';
    }
};

const updateWeatherUI = (json, city) => {
    if (cityHide.textContent === city) {
        return;
    }

    cityHide.textContent = city;
    container.style.height = '555px';
    container.classList.add('active');
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    setTimeout(() => {
        container.classList.remove('active');
    }, 2500);

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    const imagePath = getImagePath(json.weather[0].main);
    image.src = imagePath;

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
};

search.addEventListener('click', async () => {
    const APIKey = '9a6de5015390f304ad3449c2720f186f'; // Replace with your actual API key
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (city === '') {
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const json = await response.json();

        if (json.cod === '404') {
            // Handle not found
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        updateWeatherUI(json, city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error (e.g., show a generic error message)
    }
});
