import axios  from 'axios';

const Getweather = async (location) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: { q: location, appid: apiKey, units: 'metric' },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching weather data:', err.message);
        throw new Error('Failed to fetch weather data');
    }
}

export{
    Getweather
}
