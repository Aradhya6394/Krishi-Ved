import express from "express";

import {
    getIrrigationRecommendation
} from "./irrigation.controller.js";

import validate from "../../middleware/validate.middleware.js";

import {
    irrigationSchema
} from "./irrigation.validator.js";

const router = express.Router();

router.post(
    "/recommend",
    validate(irrigationSchema, "body"),
    getIrrigationRecommendation
);

export default router;