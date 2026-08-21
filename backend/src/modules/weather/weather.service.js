import axios from "axios";
const buildLocationQuery = (city, lat, lon) => {

    if (
        lat !== undefined &&
        lon !== undefined
    ) {
        return `lat=${lat}&lon=${lon}`;
    }

    return `q=${encodeURIComponent(city)}`;
};

const getCurrentWeather = async (city, lat, lon) => {

    const apiKey = process.env.WEATHER_API_KEY;

    const locationQuery =
        buildLocationQuery(city, lat, lon);

    const url =
        `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${apiKey}&units=metric`;

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


const getWeatherForecast = async (city, lat, lon) => {

    const apiKey = process.env.WEATHER_API_KEY;

    const locationQuery =
        buildLocationQuery(city, lat, lon);

    const url =
        `https://api.openweathermap.org/data/2.5/forecast?${locationQuery}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    const dailyForecast = {};

    response.data.list.forEach((item) => {

        const date =
            item.dt_txt.split(" ")[0];

        if (!dailyForecast[date]) {

            dailyForecast[date] = {
                date,

                temperatures: [],
                humidity: [],
                windSpeed: [],

                rainfall: 0,
                rainProbability: [],

                weather:
                    item.weather[0].main,

                description:
                    item.weather[0].description
            };
        }

        dailyForecast[date].temperatures.push(
            item.main.temp
        );

        dailyForecast[date].humidity.push(
            item.main.humidity
        );

        dailyForecast[date].windSpeed.push(
            item.wind.speed
        );

        if (
            item.rain &&
            item.rain["3h"]
        ) {
            dailyForecast[date].rainfall +=
                item.rain["3h"];
        }

        if (
            typeof item.pop === "number"
        ) {
            dailyForecast[date]
                .rainProbability
                .push(item.pop);
        }
    });


    const forecast =
        Object.values(dailyForecast).map((day) => {

            const averageRainProbability =
                day.rainProbability.length > 0
                    ? Math.round(
                        (
                            day.rainProbability.reduce(
                                (sum, value) =>
                                    sum + value,
                                0
                            ) /
                            day.rainProbability.length
                        ) * 100
                    )
                    : 0;


            return {

                date: day.date,

                minTemperature:
                    Math.min(
                        ...day.temperatures
                    ),

                maxTemperature:
                    Math.max(
                        ...day.temperatures
                    ),

                humidity:
                    Math.round(
                        day.humidity.reduce(
                            (sum, value) =>
                                sum + value,
                            0
                        ) /
                        day.humidity.length
                    ),

                windSpeed:
                    Number(
                        (
                            day.windSpeed.reduce(
                                (sum, value) =>
                                    sum + value,
                                0
                            ) /
                            day.windSpeed.length
                        ).toFixed(2)
                    ),

                rainfall:
                    Number(
                        day.rainfall.toFixed(2)
                    ),

                rainProbability:
                    averageRainProbability,

                weather:
                    day.weather,

                description:
                    day.description
            };
        });


    const fiveDayForecast =
        forecast.slice(0, 5);


    return {
        city: response.data.city.name,
        country: response.data.city.country,
        forecast: fiveDayForecast
    };
};


export {
    getCurrentWeather,
    getWeatherForecast
};