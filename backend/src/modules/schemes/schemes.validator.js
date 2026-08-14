import { z } from "zod";

const schemeSchema = z.object({
    name: z
        .string()
        .min(2, "Scheme name is required")
        .max(150, "Scheme name is too long")
        .trim(),

    description: z
        .string()
        .min(10, "Description is required")
        .trim(),

    benefits: z
        .array(z.string().trim())
        .default([]),

    eligibility: z
        .array(z.string().trim())
        .default([]),
    eligibilityCriteria: z.object({
    states: z
        .array(z.string().trim())
        .default([]),

    farmerCategories: z
        .array(z.string().trim())
        .default([]),

    minLandSize: z
        .number()
        .nullable()
        .default(null),

    maxLandSize: z
        .number()
        .nullable()
        .default(null),

    occupations: z
        .array(z.string().trim())
        .default([]),

    gender: z
        .array(z.string().trim())
        .default([])
    }).default({}),

    documents: z
        .array(z.string().trim())
        .default([]),

    applicationProcess: z
        .array(z.string().trim())
        .default([]),

    state: z
        .string()
        .trim()
        .default("All India"),

    category: z
        .string()
        .trim()
        .default("Agriculture"),

    officialUrl: z
        .string()
        .url("Valid official URL is required"),

    source: z
        .string()
        .trim()
        .default("myScheme")
});

export { schemeSchema };