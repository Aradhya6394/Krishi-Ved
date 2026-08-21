import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getCurrentWeather,getWeatherForecast} from "./weather.service";
    
    


import {
    FaArrowLeft,
    FaCloudSun,
    FaTint,
    FaWind,
    FaUmbrella,
    FaTemperatureHigh,
    FaSun,
    FaCloudRain,
    FaCloud,
    FaSeedling
} from "react-icons/fa";


function Weather() {

    const navigate = useNavigate();

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const [city, setCity] = useState("Lucknow");
    const [searchCity, setSearchCity] = useState("");

    const [locationMode, setLocationMode] =useState("city");
    const [coordinates, setCoordinates] =useState(null);
    const [locationLoading, setLocationLoading] =useState(false); 
           

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

        


    // --------------------------------------------------
    // FETCH WEATHER DATA
    // --------------------------------------------------

    useEffect(() => {

    const fetchWeather = async () => {

        try {

            setLoading(true);
            setError("");


            let currentData;
            let forecastData;


            if (
                locationMode === "gps" &&
                coordinates
            ) {

                currentData =
                    await getCurrentWeather({
                        lat: coordinates.lat,
                        lon: coordinates.lon
                    });


                forecastData =
                    await getWeatherForecast({
                        lat: coordinates.lat,
                        lon: coordinates.lon
                    });

            } else {

                currentData =
                    await getCurrentWeather({
                        city
                    });


                forecastData =
                    await getWeatherForecast({
                        city
                    });
            }


            setCurrentWeather(
                currentData
            );

            setForecast(
                forecastData.forecast || []
            );


        } catch (error) {

            console.error(
                "Weather Error:",
                error
            );

            setError(
                error.message ||
                "Unable to load weather information."
            );

        } finally {

            setLoading(false);

        }
    };


    if (
        locationMode === "city" ||
        coordinates
    ) {
        fetchWeather();
    }

}, [city, coordinates, locationMode]);




// USE MY LOCATION 
    const handleUseMyLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Location is not supported by your browser."
            );

            return;
        }


        setLocationLoading(true);
        setError("");


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat =
                    position.coords.latitude;

                const lon =
                    position.coords.longitude;


                setCoordinates({
                    lat,
                    lon
                });

                setLocationMode("gps");

                setLocationLoading(false);
            },


            (error) => {

                console.error(
                    "Location Error:",
                    error
                );

                setLocationLoading(false);


                setError(
                    "Unable to get your location. Please allow location access or search for your city."
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    };


// SEARCH CITY

    const handleSearch = (e) => {

    e.preventDefault();

    const trimmedCity =
        searchCity.trim();

        if (!trimmedCity) {
            return;
        }

        setLocationMode("city");

        setCoordinates(null);

        setCity(trimmedCity);
    };
    // --------------------------------------------------
    // WEATHER ICON
    // --------------------------------------------------

    const getWeatherIcon = (weather) => {

        const value =
            weather?.toLowerCase() || "";


        if (
            value.includes("rain") ||
            value.includes("drizzle")
        ) {
            return (
                <FaCloudRain className="text-5xl text-blue-500" />
            );
        }


        if (value.includes("cloud")) {
            return (
                <FaCloud className="text-5xl text-gray-500" />
            );
        }


        if (value.includes("clear")) {
            return (
                <FaSun className="text-5xl text-yellow-400" />
            );
        }


        if (value.includes("thunder")) {
            return (
                <FaCloudRain className="text-5xl text-purple-500" />
            );
        }


        return (
            <FaCloudSun className="text-5xl text-yellow-400" />
        );
    };


    // --------------------------------------------------
    // DATE FORMAT
    // --------------------------------------------------

    const formatForecastDate = (date) => {

        const forecastDate =
                new Date(`${date}T00:00:00`);

            return forecastDate.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long"
                }
            );
    };


    // WEATHER INSIGHT
    const getFarmingInsights = (weather) => {
        const insights = [];

        if (weather.temperature > 35) {
            insights.push({
                icon: "🌡️",
                title: "Heat Stress Warning",
                message:
                    "High temperature may cause heat stress to crops. Monitor soil moisture and provide irrigation if required."
            });
        }

        if (weather.humidity > 70) {
            insights.push({
                icon: "💧",
                title: "High Humidity",
                message:
                    "High humidity may increase the risk of fungal diseases. Monitor crops closely for signs of infection."
            });
        }

        if (weather.rainProbability > 60) {
            insights.push({
                icon: "🌧️",
                title: "Rain Expected",
                message:
                    "Rain is likely. Avoid unnecessary irrigation and check soil moisture before watering."
            });
        }

        if (weather.rainfall > 5) {
            insights.push({
                icon: "🌧️",
                title: "Significant Rainfall",
                message:
                    "Significant rainfall is expected. Consider delaying irrigation and ensure proper field drainage."
            });
        }

        if (weather.windSpeed > 8) {
            insights.push({
                icon: "💨",
                title: "Strong Wind",
                message:
                    "Strong winds are expected. Avoid pesticide or fertilizer spraying during windy conditions."
            });
        }

        if (insights.length === 0) {
            insights.push({
                icon: "🌱",
                title: "Favorable Conditions",
                message:
                    "Weather conditions look relatively favorable for farming activities. Continue monitoring your field and soil moisture."
            });
        }

        return insights;
    };


    // --------------------------------------------------
    // FARMING INSIGHT
    // --------------------------------------------------

    const getFarmingInsight = () => {

        if (
            !currentWeather ||
            forecast.length === 0
        ) {
            return "Weather information will help you plan your farming activities.";
        }


        const tomorrow =
            forecast[1];


        if (
            tomorrow &&
            tomorrow.rainProbability >= 50
        ) {
            return (
                "Rain is likely tomorrow. Consider checking your irrigation schedule before watering your crops."
            );
        }


        if (
            currentWeather.humidity >= 75
        ) {
            return (
                "Humidity is high today. Monitor your crops for fungal diseases and avoid unnecessary irrigation."
            );
        }


        if (
            currentWeather.temperature >= 35
        ) {
            return (
                "High temperature is expected today. Check soil moisture and provide irrigation when required."
            );
        }


        return (
            "Today's weather is suitable for normal farm activities. Continue monitoring your crops and soil conditions."
        );
    };

    const farmingInsights = currentWeather
    ? getFarmingInsights(currentWeather)
    : [];
    const todayForecast = forecast[0];


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">

                <div className="text-center">

                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

                    <p className="text-sm text-gray-600">
                        Loading weather information...
                    </p>

                </div>

            </div>
        );
    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">

                <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">

                    <div className="mb-4 text-4xl">
                        🌧️
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Unable to load weather
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // --------------------------------------------------
    // MAIN UI
    // --------------------------------------------------

    return (

        <div className="min-h-screen bg-emerald-50">

            {/* =========================
                HEADER
            ========================= */}

            <header className="border-b border-emerald-100 bg-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() =>
                                navigate("/dashboard")
                            }
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-700 transition hover:bg-emerald-100"
                        >
                            <FaArrowLeft />
                        </button>


                        <div>

                            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                                Weather
                            </h1>

                            <p className="text-sm text-slate-500 sm:text-base">
                                Weather information for your farm
                            </p>

                        </div>

                    </div>


                    <div className="hidden items-center gap-2 text-slate-700 sm:flex">

                        <FaCloudSun className="text-2xl text-emerald-600" />

                        <span className="font-semibold">
                            Smart Farming Assistant
                        </span>

                    </div>

                </div>

            </header>


            {/* =========================
                CONTENT
            ========================= */}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


                {/* LOCATION */}


                <section className="mb-6">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                        {/* LOCATION */}

                        <div>

                            <p className="text-sm text-slate-500">
                                Current Location
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {currentWeather.city},{" "}
                                {currentWeather.country}
                            </h2>

                        </div>


                        {/* SEARCH */}

                        
                        <div className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl">

                            <form
                                onSubmit={handleSearch}
                                className="flex min-w-0 flex-1 gap-2"
                            >

                                <input
                                    type="text"
                                    value={searchCity}
                                    onChange={(e) =>
                                        setSearchCity(e.target.value)
                                    }
                                    placeholder="Search city..."
                                    className="min-w-0 flex-1 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <button
                                    type="submit"
                                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Search
                                </button>

                            </form>

                            <button
                                type="button"
                                onClick={handleUseMyLocation}
                                disabled={locationLoading}
                                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {locationLoading
                                    ? "Getting Location..."
                                    : "📍 Use My Location"
                                }
                            </button>

                        </div>

                    </div>

                </section>


                {/* =========================
                    CURRENT WEATHER
                ========================= */}

                <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500 p-5 text-white shadow-md sm:p-8">

                    <div className="grid gap-6 lg:grid-cols-2">


                        {/* LEFT */}

                        <div className="flex flex-col justify-center">

                            <p className="text-sm font-medium text-white/90">
                                Today's Weather
                            </p>


                            <div className="mt-3 flex items-center gap-4">

                                {getWeatherIcon(
                                    currentWeather.weather
                                )}


                                <div>

                                    <div className="text-5xl font-bold sm:text-6xl">
                                        {Math.round(
                                            currentWeather.temperature
                                        )}°C
                                    </div>

                                    <p className="mt-1 text-lg capitalize">
                                        {currentWeather.description}
                                    </p>

                                </div>

                            </div>


                            <p className="mt-5 text-sm text-white/90 sm:text-base">

                                Feels like{" "}

                                {Math.round(
                                    currentWeather.feelsLike
                                )}°C

                            </p>

                        </div>


                        {/* RIGHT */}

                        <div className="grid grid-cols-2 gap-3">


                            {/* HUMIDITY */}

                            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

                                <FaTint className="text-xl" />

                                <p className="mt-3 text-sm text-white/80">
                                    Humidity
                                </p>

                                <p className="mt-1 text-xl font-bold">
                                    {currentWeather.humidity}%
                                </p>

                            </div>


                            {/* WIND */}

                            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

                                <FaWind className="text-xl" />

                                <p className="mt-3 text-sm text-white/80">
                                    Wind
                                </p>

                                <p className="mt-1 text-xl font-bold">

                                    {(
                                        currentWeather.windSpeed *
                                        3.6
                                    ).toFixed(1)}{" "}
                                    km/h

                                </p>

                            </div>


                            {/* RAIN */}

                            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

                                <FaUmbrella className="text-xl" />

                                <p className="mt-3 text-sm text-white/80">
                                    Rain Chance
                                </p>

                                <p className="mt-1 text-xl font-bold">

                                    {forecast[0]?.rainProbability ?? 0}%

                                </p>

                            </div>


                            {/* HIGH / LOW */}

                            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

                                <FaTemperatureHigh className="text-xl" />

                                <p className="mt-3 text-sm text-white/80">
                                    High / Low
                                </p>

                                <p className="mt-1 text-xl font-bold">

                                    {forecast[0]
                                        ? `${Math.round(
                                            forecast[0].maxTemperature
                                        )}° / ${Math.round(
                                            forecast[0].minTemperature
                                        )}°`
                                        : "--"
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================
                    FARMING INSIGHT
                ========================= */}

                <div>
    
                    <h2 className="text-xl font-bold text-slate-800">
                        Farming Insight
                    </h2>

                    <div className="mt-4 space-y-3">

                        {farmingInsights.map((insight, index) => (

                            <div
                                key={index}
                                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
                            >

                                <div className="flex items-start gap-3">

                                    <span className="text-xl">
                                        {insight.icon}
                                    </span>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            {insight.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            {insight.message}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* =========================
                    5 DAY FORECAST
                ========================= */}

                <section className="mb-10">

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-slate-800">
                            5-Day Forecast
                        </h2>

                        <p className="text-slate-500">
                            Plan your farming activities according to the weather.
                        </p>

                        {/* forecast cards */}
                    </div>
                    

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

                        {forecast.map((day, index) => (

                            <div
                                key={day.date}
                                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                
                                <p className="font-semibold text-slate-800">
                                    {formatForecastDate(day.date)}
                                </p>


                                <div className="mt-5 flex justify-center">

                                    {getWeatherIcon(
                                        day.weather
                                    )}

                                </div>


                                <div className="mt-4 text-center">

                                    <p className="text-2xl font-bold text-slate-800">

                                        {Math.round(
                                            day.maxTemperature
                                        )}°C

                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {Math.round(
                                            day.minTemperature
                                        )}°C low
                                    </p>

                                    <p className="mt-2 text-sm capitalize text-slate-500">
                                        {day.description}
                                    </p>

                                    <p className="mt-3 text-sm font-medium text-blue-600">
                                        Rain: {day.rainProbability}%
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* =========================
                    FARMING RECOMMENDATIONS
                ========================= */}

                <section>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Farming Recommendations
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 sm:text-base">
                        Suggestions based on the current weather.
                    </p>


                    <div className="mt-5 grid gap-5 md:grid-cols-4">


                        {/* IRRIGATION */}

                        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">

                                <FaTint className="text-xl text-emerald-600" />

                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                Irrigation
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">

                                {   todayForecast?.rainProbability > 60
                                    ? "Rain is likely today. Avoid unnecessary irrigation and check soil moisture before watering your crops."
                                    : todayForecast?.rainfall > 5
                                    ? "Significant rainfall is expected. Irrigation may be delayed; check soil moisture before watering."
                                    : currentWeather.humidity > 70
                                    ? "Humidity is high today. Check soil moisture before irrigating your crops."
                                    : "Check soil moisture before irrigating your crops."
                                }

                            </p>

                        </div>


                        {/* FIELD ACTIVITY */}

                        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50">

                                <FaSun className="text-xl text-yellow-500" />

                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                Field Activity
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">

                                {currentWeather.temperature > 35
                                    ? "High temperatures may cause heat stress. Prefer field activities during cooler morning or evening hours."
                                    : currentWeather.windSpeed > 20
                                    ? "Strong winds are expected. Avoid activities that involve spraying and take care while working in open fields."
                                    : "Today's conditions are suitable for regular farm activities and field inspection."
                                }

                            </p>

                        </div>


                        {/* RAIN PREPARATION */}

                        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                                <FaUmbrella className="text-xl text-blue-500" />

                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                Rain Preparation
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">

                                {   todayForecast?.rainProbability > 60
                                    ? "Rain is likely today. Avoid unnecessary irrigation and protect harvested crops from rainfall."
                                    : todayForecast?.rainfall > 5
                                    ? "Significant rainfall is expected. Consider delaying irrigation and protect harvested crops."
                                    : "No significant rainfall is expected today. Continue normal farm activities while monitoring the forecast."
                                }

                            </p>

                        </div>

                        {/* SPRAYING */}

                        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">

                                <FaWind className="text-xl text-orange-500" />

                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                Spraying
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">

                                {currentWeather.windSpeed > 20
                                    ? "Strong winds are expected. Avoid pesticide spraying because wind can cause spray drift."
                                    : "Wind conditions are suitable for spraying. Follow recommended pesticide application practices."
                                }

                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}


export default Weather;