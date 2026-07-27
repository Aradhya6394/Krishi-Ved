import { z } from "zod";

const weatherSchema = z.object({
    city: z
        .string()
        .min(2, "City name must be at least 2 characters")
        .trim(),
});

export { weatherSchema };