import {
    getCurrentWeather,
    getWeatherForecast
} from "./weather.service.js";


const currentWeather = async (req, res) => {
    try {
        const { city, lat, lon } = req.query;

        const weather = await getCurrentWeather(
            city,
            lat,
            lon
        );

        res.status(200).json({
            success: true,
            data: weather,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch weather data",
            error:
                error.response?.data?.message ||
                error.message,
        });
    }
};


const weatherForecast = async (req, res) => {
    try {
        const { city, lat, lon } = req.query;

        const forecast = await getWeatherForecast(
            city,
            lat,
            lon
        );

        res.status(200).json({
            success: true,
            data: forecast,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch weather forecast",
            error:
                error.response?.data?.message ||
                error.message,
        });
    }
};


export {
    currentWeather,
    weatherForecast
};