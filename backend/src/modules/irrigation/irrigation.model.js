import mongoose from "mongoose";

const irrigationSchema = new mongoose.Schema(
    {
        crop: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            city: {
                type: String,
                required: true,
                trim: true
            },

            state: {
                type: String,
                required: true,
                trim: true
            }
        },

        area: {
            value: {
                type: Number,
                required: true,
                min: 0.01
            },

            unit: {
                type: String,
                enum: ["acre", "hectare"],
                default: "acre"
            }
        },

        soilType: {
            type: String,
            enum: [
                "sandy",
                "loamy",
                "clayey",
                "silty",
                "black",
                "red",
                "other"
            ],
            default: "loamy"
        },

        irrigationMethod: {
            type: String,
            enum: [
                "drip",
                "sprinkler",
                "flood",
                "other"
            ],
            default: "flood"
        },

        sowingDate: {
            type: Date,
            required: true
        },

        recommendation: {
            irrigateToday: {
                type: Boolean,
                required: true
            },

            estimatedWaterLitres: {
                type: Number,
                default: 0
            },

            nextIrrigationDate: {
                type: Date
            },

            reason: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

const Irrigation = mongoose.model(
    "Irrigation",
    irrigationSchema
);

export default Irrigation;