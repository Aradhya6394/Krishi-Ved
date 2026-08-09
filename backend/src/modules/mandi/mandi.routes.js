import express from "express";

import {
    getCommodities,
    getGeographiesController,
    getMarketsController,
    getPricesController
} from "./mandi.controller.js";

import {
    validateMarketsQuery,
    validatePricesQuery
} from "./mandi.validator.js";

const router = express.Router();

router.get("/commodities", getCommodities);

router.get("/geographies", getGeographiesController);

router.post(
    "/markets",
    validateMarketsQuery,
    getMarketsController
);

router.post(
    "/prices",
    validatePricesQuery,
    getPricesController
);

export default router;