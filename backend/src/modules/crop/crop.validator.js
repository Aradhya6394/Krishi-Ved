import { z } from "zod";

const cropRecommendationSchema = z.object({
    location: z.string().min(2),

    season: z.enum([
        "Kharif",
        "Rabi",
        "Zaid"
    ]),

    soilType: z.enum([
        "Alluvial",
        "Black",
        "Red",
        "Laterite",
        "Sandy",
        "Clay",
        "Loamy"
    ]),

    irrigation: z.enum([
        "Available",
        "Limited",
        "Not Available"
    ]),

    previousCrop: z.string().min(2)
});

export { cropRecommendationSchema };