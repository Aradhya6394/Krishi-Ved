import express from "express";
import { cropRecommendation } from "./crop.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { cropRecommendationSchema } from "./crop.validator.js";

const router = express.Router();

router.post(
    "/recommend",
    validate(cropRecommendationSchema, "body"),
    cropRecommendation
);

export default router;