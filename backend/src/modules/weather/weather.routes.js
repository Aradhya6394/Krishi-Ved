import express from "express";
import { currentWeather , weatherForecast} from "./weather.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { weatherSchema } from "./weather.validator.js";

const router = express.Router();

router.get(
    "/current",
    validate(weatherSchema, "query"),
    currentWeather
);
router.get(
    "/forecast",
    validate(weatherSchema, "query"),
    weatherForecast
);

export default router;