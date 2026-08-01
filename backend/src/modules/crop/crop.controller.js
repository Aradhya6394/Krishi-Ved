import { recommendCrops } from "./crop.service.js";

const cropRecommendation = async (req, res) => {
    try {
        const recommendations = await recommendCrops(req.body);

        res.status(200).json({
            success: true,
            data: {
                recommendations
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate crop recommendations",
            error: error.message
        });
    }
};

export { cropRecommendation };