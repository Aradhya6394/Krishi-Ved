import { detectDisease } from "./disease.service.js";

const diseaseDetection = async (req, res) => {
    try {
        const { crop } = req.body;

        const imagePath = req.file ? req.file.path : null;

        const result = await detectDisease({
            crop,
            imagePath
        });

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Disease detection error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to detect crop disease",
            error: error.message
        });
    }
};

export { diseaseDetection };