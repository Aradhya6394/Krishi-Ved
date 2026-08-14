import { z } from "zod";

const irrigationSchema = z.object({
    crop: z
        .string()
        .min(2, "Crop name is required")
        .max(50, "Crop name is too long")
        .trim(),

    location: z.object({
        city: z
            .string()
            .min(2, "City is required")
            .trim(),

        state: z
            .string()
            .min(2, "State is required")
            .trim()
    }),

    area: z.object({
        value: z
            .number()
            .positive("Area must be greater than 0"),

        unit: z
            .enum(["acre", "hectare"])
    }),

    soilType: z.enum([
        "sandy",
        "loamy",
        "clayey",
        "silty",
        "black",
        "red",
        "other"
    ]),

    irrigationMethod: z.enum([
        "drip",
        "sprinkler",
        "flood",
        "other"
    ]),

    sowingDate: z
        .string()
        .min(1, "Sowing date is required")
});

export {
    irrigationSchema
};