import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        benefits: {
            type: [String],
            default: []
        },

        eligibility: {
            type: [String],
            default: []
        },
        eligibilityCriteria: {
            states: {
                type: [String],
                default: []
            },

            farmerCategories: {
                type: [String],
                default: []
            },

            minLandSize: {
                type: Number,
                default: null
            },

            maxLandSize: {
                type: Number,
                default: null
            },

            occupations: {
                type: [String],
                default: []
            },

            gender: {
                type: [String],
                default: []
            }
        },

        documents: {
            type: [String],
            default: []
        },

        applicationProcess: {
            type: [String],
            default: []
        },

        state: {
            type: String,
            default: "All India",
            trim: true
        },

        category: {
            type: String,
            default: "Agriculture",
            trim: true
        },

        officialUrl: {
            type: String,
            required: true,
            trim: true
        },

        source: {
            type: String,
            default: "myScheme",
            trim: true
        },

        lastUpdated: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Scheme = mongoose.model("Scheme", schemeSchema);

export default Scheme;