import {
    getMandiCommodities,
    getGeographies,
    getMarkets,
    getPrices
} from "./mandi.service.js";

export const getCommodities = async (req, res, next) => {
    try {
        const commodities = await getMandiCommodities();

        res.status(200).json({
            success: true,
            data: commodities
        });
    } catch (error) {
        next(error);
    }
};

export const getGeographiesController = async (req, res, next) => {
    try {
        const geographies = await getGeographies();

        res.status(200).json({
            success: true,
            data: geographies
        });
    } catch (error) {
        next(error);
    }
};

export const getMarketsController = async (req, res, next) => {
    try {
        const {
            commodityId,
            stateId,
            districtId,
            indicator
        } = req.body;

        const markets = await getMarkets(
            commodityId,
            stateId,
            districtId,
            indicator
        );

        res.status(200).json({
            success: true,
            data: markets
        });
    } catch (error) {
        next(error);
    }
};

export const getPricesController = async (req, res, next) => {
    try {
        const {
            commodityId,
            stateId,
            districtIds,
            marketIds,
            fromDate,
            toDate
        } = req.body;

        const prices = await getPrices({
            commodityId,
            stateId,
            districtIds,
            marketIds,
            fromDate,
            toDate
        });

        res.status(200).json({
            success: true,
            data: prices
        });
    } catch (error) {
        next(error);
    }
};