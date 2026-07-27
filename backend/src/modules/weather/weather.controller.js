import { getCurrentWeather } from "./weather.service.js";

const currentWeather = async (req, res) => {
    try {
        const { city } = req.query;

        const weather = await getCurrentWeather(city);

        res.status(200).json({
            success: true,
            data: weather,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch weather data",
            error: error.response?.data?.message || error.message,
        });
    }
};

export { currentWeather };