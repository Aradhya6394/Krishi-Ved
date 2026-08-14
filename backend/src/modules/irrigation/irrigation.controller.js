import {
    generateIrrigationRecommendation
} from "./irrigation.service.js";

const getIrrigationRecommendation = async (req, res) => {
    try {
        const {
            crop,
            location,
            area,
            soilType,
            irrigationMethod,
            sowingDate
        } = req.body;

        const result = await generateIrrigationRecommendation({
            crop,
            location,
            area,
            soilType,
            irrigationMethod,
            sowingDate
        });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error(
            "Irrigation recommendation error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to generate irrigation recommendation",
            error: error.message
        });
    }
};

export {
    getIrrigationRecommendation
};