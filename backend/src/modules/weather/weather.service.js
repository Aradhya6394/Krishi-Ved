import axios from "axios";

const getCurrentWeather = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    return {
        city: response.data.name,
        country: response.data.sys.country,

        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,

        weather: response.data.weather[0].main,
        description: response.data.weather[0].description,

        windSpeed: response.data.wind.speed,

        pressure: response.data.main.pressure,

        visibility: response.data.visibility,

        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset
    };
};

export { getCurrentWeather };