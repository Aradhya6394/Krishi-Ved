
export const validateMandiQuery = (req, res, next) => {
    const { crop, state } = req.query;

    // Check required fields
    if (!crop || !state) {
        return res.status(400).json({
            success: false,
            message: "Crop and state are required"
        });
    }

    next();
};