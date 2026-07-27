import express from "express";
import { currentWeather } from "./weather.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { weatherSchema } from "./weather.validator.js";

const router = express.Router();

router.get(
    "/current",
    validate(weatherSchema, "query"),
    currentWeather
);

export default router;