import express from "express";
import { diseaseDetection } from "./disease.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { diseaseDetectionSchema } from "./disease.validator.js";
import uploadDiseaseImage from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/detect",
    uploadDiseaseImage.single("image"),
    validate(diseaseDetectionSchema, "body"),
    diseaseDetection
);

export default router;