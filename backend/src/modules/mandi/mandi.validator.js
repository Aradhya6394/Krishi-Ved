export const validateMarketsQuery = (req, res, next) => {
    const {
        commodityId,
        stateId,
        districtId,
        indicator
    } = req.body;

    if (!commodityId || !stateId || !districtId) {
        return res.status(400).json({
            success: false,
            message: "commodityId, stateId and districtId are required"
        });
    }

    if (indicator && indicator !== "price" && indicator !== "arrival") {
        return res.status(400).json({
            success: false,
            message: "indicator must be either price or arrival"
        });
    }

    next();
};


export const validatePricesQuery = (req, res, next) => {
    const {
        commodityId,
        stateId,
        districtIds,
        marketIds,
        fromDate,
        toDate
    } = req.body;

    // Required fields
    if (!commodityId || !stateId) {
        return res.status(400).json({
            success: false,
            message: "commodityId and stateId are required"
        });
    }

    // District IDs
    if (
        !Array.isArray(districtIds) ||
        districtIds.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: "districtIds must be a non-empty array"
        });
    }

    // Market IDs
    if (
        !Array.isArray(marketIds) ||
        marketIds.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: "marketIds must be a non-empty array"
        });
    }

    // Dates
    if (!fromDate || !toDate) {
        return res.status(400).json({
            success: false,
            message: "fromDate and toDate are required"
        });
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format"
        });
    }

    if (startDate > endDate) {
        return res.status(400).json({
            success: false,
            message: "fromDate cannot be later than toDate"
        });
    }

    next();
};