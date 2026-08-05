import { z } from "zod";

const diseaseDetectionSchema = z.object({
    crop: z
        .string()
        .min(2, "Crop name is required")
        .max(50, "Crop name is too long")
        .trim()
});

export { diseaseDetectionSchema };