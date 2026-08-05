import { getMandiPrices } from "./mandi.service.js";

// Controller for mandi price requests
export const getPrices = async (req, res) => {
    try {
        // Read crop and state from query
        const { crop, state } = req.query;

        const result = await getMandiPrices(crop, state);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: "Failed to fetch mandi prices"
        });
    }
};