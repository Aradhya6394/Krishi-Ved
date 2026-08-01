import { z } from "zod";

const cropRecommendationSchema = z.object({
    nitrogen: z.number().min(0),
    phosphorus: z.number().min(0),
    potassium: z.number().min(0),

    temperature: z.number(),
    humidity: z.number().min(0).max(100),

    ph: z.number().min(0).max(14),
    rainfall: z.number().min(0)
});

export { cropRecommendationSchema };