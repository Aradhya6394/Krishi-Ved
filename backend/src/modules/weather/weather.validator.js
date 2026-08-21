import { z } from "zod";

const weatherSchema = z.object({
    city: z
        .string()
        .min(2, "City name must be at least 2 characters")
        .trim()
        .optional(),

    lat: z.coerce
        .number()
        .min(-90, "Invalid latitude")
        .max(90, "Invalid latitude")
        .optional(),

    lon: z.coerce
        .number()
        .min(-180, "Invalid longitude")
        .max(180, "Invalid longitude")
        .optional(),
}).refine(
    (data) => {
        const hasCity = !!data.city;
        const hasCoordinates =
            data.lat !== undefined &&
            data.lon !== undefined;

        return hasCity || hasCoordinates;
    },
    {
        message: "City or latitude and longitude are required",
    }
);

export { weatherSchema };