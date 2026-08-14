import { getCropConfig } from "./irrigation.config.js";
import { getWeatherForecast } from "../weather/weather.service.js";


const getDaysSinceSowing = (sowingDate) => {
    const sowing = new Date(sowingDate);
    const today = new Date();

    const difference =
        today.getTime() - sowing.getTime();

    return Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
};


const getGrowthStage = (crop, sowingDate) => {
    const cropConfig = getCropConfig(crop);

    if (!cropConfig) {
        throw new Error(
            `Crop "${crop}" is not supported yet`
        );
    }

    const daysSinceSowing =
        getDaysSinceSowing(sowingDate);

    if (daysSinceSowing < 0) {
        throw new Error(
            "Sowing date cannot be in the future"
        );
    }

    for (const stage of cropConfig.stages) {
        if (daysSinceSowing <= stage.maxDays) {
            return {
                stage: stage.name,
                kc: stage.kc,
                daysSinceSowing
            };
        }
    }

    const lastStage =
        cropConfig.stages[
            cropConfig.stages.length - 1
        ];

    return {
        stage: lastStage.name,
        kc: lastStage.kc,
        daysSinceSowing
    };
};


const estimateETo = ({
    minTemperature,
    maxTemperature,
    humidity,
    windSpeed
}) => {

    const averageTemperature =
        (minTemperature + maxTemperature) / 2;

    const temperatureRange =
        Math.max(
            maxTemperature - minTemperature,
            0
        );

    let eto =
        0.6 +
        (0.12 * averageTemperature) +
        (0.08 * temperatureRange) +
        (0.4 * windSpeed) -
        (0.015 * humidity);

    eto = Math.max(1, eto);
    eto = Math.min(8, eto);

    return Number(eto.toFixed(2));
};


const calculateWaterRequirementLitres = ({
    waterRequirementMm,
    area
}) => {

    let areaInAcres;

    if (area.unit === "acre") {
        areaInAcres = area.value;
    } else {
        // Convert hectare to acre
        areaInAcres = area.value * 2.47105;
    }

    /*
     * 1 mm water over 1 acre
     * = approximately 4046.86 litres
     */
    const waterLitres =
        waterRequirementMm *
        areaInAcres *
        4046.86;

    return Number(
        waterLitres.toFixed(2)
    );
};


const getIrrigationEfficiency = (method) => {

    const efficiency = {
        drip: 0.9,
        sprinkler: 0.75,
        flood: 0.6,
        other: 0.6
    };

    return efficiency[method] || 0.6;
};


const calculateEffectiveRainfall = (rainfall) => {

    const effectiveRainfall =
        rainfall * 0.8;

    return Number(
        effectiveRainfall.toFixed(2)
    );
};


const getIrrigationInterval = (
    soilType,
    cropWaterRequirement
) => {

    let availableWaterDays;

    switch (soilType) {

        case "sandy":
            availableWaterDays = 1.5;
            break;

        case "loamy":
            availableWaterDays = 2.5;
            break;

        case "silty":
            availableWaterDays = 3;
            break;

        case "clayey":
            availableWaterDays = 4;
            break;

        case "black":
            availableWaterDays = 4;
            break;

        case "red":
            availableWaterDays = 2;
            break;

        default:
            availableWaterDays = 2;
    }

    /*
     * Higher crop water demand means
     * irrigation is needed sooner.
     */
    const demandFactor =
        cropWaterRequirement > 6
            ? 0.7
            : cropWaterRequirement > 4
                ? 0.85
                : 1;

    return Math.max(
        1,
        Math.round(
            availableWaterDays * demandFactor
        )
    );
};


const generateIrrigationRecommendation = async ({
    crop,
    location,
    area,
    soilType,
    irrigationMethod,
    sowingDate
}) => {

    if (
        !crop ||
        !location ||
        !area ||
        !soilType ||
        !irrigationMethod ||
        !sowingDate
    ) {
        throw new Error(
            "All irrigation details are required"
        );
    }
    const growthStage =
        getGrowthStage(
            crop,
            sowingDate
        );
    const weatherData =
        await getWeatherForecast(
            location.city
        );

    if (
        !weatherData ||
        !weatherData.forecast ||
        weatherData.forecast.length === 0
    ) {
        throw new Error(
            "Weather forecast data is not available"
        );
    }

    const todayForecast =
        weatherData.forecast[0];


    const expectedRainfall =
        todayForecast?.rainfall || 0;


    const minTemperature =
        todayForecast?.minTemperature || 0;


    const maxTemperature =
        todayForecast?.maxTemperature || 0;


    const humidity =
        todayForecast?.humidity || 0;


    const windSpeed =
        todayForecast?.windSpeed || 0;

    const estimatedETo =
        estimateETo({
            minTemperature,
            maxTemperature,
            humidity,
            windSpeed
        });
    const cropWaterRequirement =
        Number(
            (
                estimatedETo *
                growthStage.kc
            ).toFixed(2)
        );
    const estimatedWaterLitres =
        calculateWaterRequirementLitres({
            waterRequirementMm:
                cropWaterRequirement,
            area
        });
    const effectiveRainfall =
        calculateEffectiveRainfall(
            expectedRainfall
        );
    const netWaterRequirement =
        Math.max(
            cropWaterRequirement -
                effectiveRainfall,
            0
        );

    const irrigationWaterLitres =
        calculateWaterRequirementLitres({
            waterRequirementMm:
                netWaterRequirement,
            area
        });

    const efficiency =
        getIrrigationEfficiency(
            irrigationMethod
        );
    const actualWaterToApply =
        Number(
            (
                irrigationWaterLitres /
                efficiency
            ).toFixed(2)
        );

    const irrigationInterval =
        getIrrigationInterval(
            soilType,
            cropWaterRequirement
        );

    const nextIrrigationDate =
        new Date();

    nextIrrigationDate.setDate(
        nextIrrigationDate.getDate() +
            irrigationInterval
    );

    const upcomingRainfall =
    weatherData.forecast
        .slice(0, 3)
        .reduce(
            (total, day) =>
                total + (day.rainfall || 0),
            0
        );

const significantUpcomingRain =
    upcomingRainfall >= 10;

const irrigateToday =
    expectedRainfall < 3 &&
    !significantUpcomingRain;

    return {

        crop,

        location,

        area,

        soilType,

        irrigationMethod,

        sowingDate,

        growthStage:
            growthStage.stage,

        daysSinceSowing:
            growthStage.daysSinceSowing,

        cropCoefficient:
            growthStage.kc,

        weather:
            weatherData,

        irrigation: {

            irrigateToday,

            expectedRainfall,

            upcomingRainfall,

            significantUpcomingRain,

            effectiveRainfall,

            estimatedETo,

            cropWaterRequirement,

            estimatedWaterLitres,

            netWaterRequirement,

            irrigationWaterLitres,

            irrigationEfficiency:
                efficiency,

            actualWaterToApply,

            irrigationInterval,

            nextIrrigationDate
        },

        message:
        significantUpcomingRain
        ? "Irrigation can be postponed because significant rainfall is expected in the next few days."
        : expectedRainfall >= 3
            ? "Irrigation is not recommended because sufficient rainfall is expected today."
            : "Irrigation may be required because significant rainfall is not expected."
    };
};


export {
    generateIrrigationRecommendation
};