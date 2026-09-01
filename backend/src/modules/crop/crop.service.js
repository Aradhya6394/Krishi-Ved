import axios from "axios";

const ML_SERVICE_URL = "http://127.0.0.1:5001";

const soilProfiles = {
    Alluvial: {
        nitrogen: 80,
        phosphorus: 45,
        potassium: 40,
        ph: 6.8
    },
    Black: {
        nitrogen: 70,
        phosphorus: 40,
        potassium: 50,
        ph: 7.5
    },
    Red: {
        nitrogen: 50,
        phosphorus: 35,
        potassium: 35,
        ph: 6.5
    },
    Laterite: {
        nitrogen: 40,
        phosphorus: 30,
        potassium: 30,
        ph: 5.8
    },
    Sandy: {
        nitrogen: 45,
        phosphorus: 25,
        potassium: 25,
        ph: 6.2
    },
    Clay: {
        nitrogen: 75,
        phosphorus: 45,
        potassium: 45,
        ph: 7.0
    },
    Loamy: {
        nitrogen: 80,
        phosphorus: 50,
        potassium: 50,
        ph: 6.8
    }
};

const getSeasonConditions = (season) => {
    const conditions = {
        Kharif: {
            temperature: 28,
            humidity: 75,
            rainfall: 180
        },
        Rabi: {
            temperature: 20,
            humidity: 55,
            rainfall: 60
        },
        Zaid: {
            temperature: 32,
            humidity: 50,
            rainfall: 40
        }
    };

    return conditions[season];
};

const recommendCrops = async ({
    location,
    season,
    soilType,
    irrigation,
    previousCrop
}) => {
    try {
        const soil = soilProfiles[soilType];

        if (!soil) {
            throw new Error("Invalid soil type");
        }

        const conditions = getSeasonConditions(season);

        let rainfall = conditions.rainfall;

        if (irrigation === "Available") {
            rainfall += 20;
        }

        if (irrigation === "Not Available") {
            rainfall -= 10;
        }

        const response = await axios.post(
            `${ML_SERVICE_URL}/recommend-crops`,
            {
                N: soil.nitrogen,
                P: soil.phosphorus,
                K: soil.potassium,
                temperature: conditions.temperature,
                humidity: conditions.humidity,
                ph: soil.ph,
                rainfall
            }
        );

        let recommendations = response.data.recommendations;

        recommendations = recommendations.map((item) => ({
            ...item,
            confidence:
                item.crop.toLowerCase() === previousCrop.toLowerCase()
                    ? Math.max(item.confidence - 15, 0)
                    : item.confidence
        }));

        recommendations.sort(
            (a, b) => b.confidence - a.confidence
        );

        return recommendations;

    } catch (error) {
        console.error(
            "ML Crop Recommendation Error:",
            error.response?.data || error.message
        );

        throw new Error(
            error.response?.data?.message ||
            "Failed to get crop recommendations"
        );
    }
};

export { recommendCrops };