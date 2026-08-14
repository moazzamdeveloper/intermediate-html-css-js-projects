const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error');
const weatherCard = document.getElementById('weather-card');

// Get a free API key from https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  loading.classList.remove('hidden');
  errorEl.classList.add('hidden');
  weatherCard.classList.add('hidden');

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error('City not found');
    }

    const data = await res.json();

    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.classList.remove('hidden');
  } catch (err) {
    errorEl.textContent = err.message || 'Something went wrong';
    errorEl.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});