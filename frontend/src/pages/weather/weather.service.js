const API_BASE_URL =
    "http://localhost:5000/api/weather";


const getCurrentWeather = async ({
    city,
    lat,
    lon
}) => {

    let query;

    if (
        lat !== undefined &&
        lon !== undefined
    ) {
        query =
            `lat=${lat}&lon=${lon}`;
    } else {
        query =
            `city=${encodeURIComponent(city)}`;
    }


    const response = await fetch(
        `${API_BASE_URL}/current?${query}`
    );


    const result =
        await response.json();


    if (
        !response.ok ||
        !result.success
    ) {
        throw new Error(
            result.message ||
            "Failed to fetch current weather"
        );
    }


    return result.data;
};


const getWeatherForecast = async ({
    city,
    lat,
    lon
}) => {

    let query;

    if (
        lat !== undefined &&
        lon !== undefined
    ) {
        query =
            `lat=${lat}&lon=${lon}`;
    } else {
        query =
            `city=${encodeURIComponent(city)}`;
    }


    const response = await fetch(
        `${API_BASE_URL}/forecast?${query}`
    );


    const result =
        await response.json();


    if (
        !response.ok ||
        !result.success
    ) {
        throw new Error(
            result.message ||
            "Failed to fetch weather forecast"
        );
    }


    return result.data;
};


export {
    getCurrentWeather,
    getWeatherForecast
};