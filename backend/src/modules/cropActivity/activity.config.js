const cropActivityConfig = {

    // =========================
    // WHEAT
    // =========================

    wheat: {

        stages: [
            {
                name: "Germination",
                minDays: 0,
                maxDays: 15
            },
            {
                name: "Early Growth",
                minDays: 16,
                maxDays: 35
            },
            {
                name: "Development",
                minDays: 36,
                maxDays: 60
            },
            {
                name: "Maturity",
                minDays: 61,
                maxDays: 100
            }
        ],

        activities: [
            {
                name: "Germination monitoring",
                type: "monitoring",
                startDay: 0,
                endDay: 15,
                description:
                    "Check seed germination and early plant establishment."
            },

            {
                name: "Weed monitoring",
                type: "monitoring",
                startDay: 20,
                endDay: 50,
                description:
                    "Inspect the field for weed growth and competition."
            },

            {
                name: "Pest monitoring",
                type: "monitoring",
                startDay: 35,
                endDay: 70,
                description:
                    "Regularly inspect plants for signs of pest infestation."
            },

            {
                name: "Disease monitoring",
                type: "monitoring",
                startDay: 35,
                endDay: 70,
                description:
                    "Inspect leaves and plants for unusual spots, discoloration or disease symptoms."
            },

            {
                name: "Nutrient management",
                type: "fertilizer",
                startDay: 40,
                endDay: 50,
                description:
                    "Evaluate crop nutrient requirements during the development stage."
            },

            {
                name: "Harvest preparation",
                type: "harvest",
                startDay: 90,
                endDay: 100,
                description:
                    "Monitor crop maturity and prepare for harvesting."
            }
        ]
    },


    // =========================
    // RICE
    // =========================

    rice: {

        stages: [
            {
                name: "Germination",
                minDays: 0,
                maxDays: 15
            },
            {
                name: "Vegetative Growth",
                minDays: 16,
                maxDays: 45
            },
            {
                name: "Reproductive Growth",
                minDays: 46,
                maxDays: 75
            },
            {
                name: "Maturity",
                minDays: 76,
                maxDays: 120
            }
        ],

        activities: [
            {
                name: "Germination monitoring",
                type: "monitoring",
                startDay: 0,
                endDay: 15,
                description:
                    "Check seed germination and early seedling establishment."
            },

            {
                name: "Weed monitoring",
                type: "monitoring",
                startDay: 15,
                endDay: 45,
                description:
                    "Inspect the field for weeds that may compete with rice plants."
            },

            {
                name: "Nutrient management",
                type: "fertilizer",
                startDay: 20,
                endDay: 45,
                description:
                    "Evaluate nutrient requirements during vegetative growth."
            },

            {
                name: "Pest monitoring",
                type: "monitoring",
                startDay: 30,
                endDay: 80,
                description:
                    "Regularly inspect rice plants for signs of pest infestation."
            },

            {
                name: "Disease monitoring",
                type: "monitoring",
                startDay: 30,
                endDay: 80,
                description:
                    "Inspect leaves, stems and panicles for disease symptoms."
            },

            {
                name: "Reproductive stage monitoring",
                type: "monitoring",
                startDay: 46,
                endDay: 75,
                description:
                    "Monitor flowering and panicle development."
            },

            {
                name: "Harvest preparation",
                type: "harvest",
                startDay: 105,
                endDay: 120,
                description:
                    "Monitor grain maturity and prepare the field for harvesting."
            }
        ]
    },


    // =========================
    // MAIZE
    // =========================

    maize: {

        stages: [
            {
                name: "Germination",
                minDays: 0,
                maxDays: 10
            },
            {
                name: "Vegetative Growth",
                minDays: 11,
                maxDays: 40
            },
            {
                name: "Flowering",
                minDays: 41,
                maxDays: 65
            },
            {
                name: "Grain Filling",
                minDays: 66,
                maxDays: 90
            },
            {
                name: "Maturity",
                minDays: 91,
                maxDays: 120
            }
        ],

        activities: [
            {
                name: "Germination monitoring",
                type: "monitoring",
                startDay: 0,
                endDay: 10,
                description:
                    "Check seed emergence and early plant establishment."
            },

            {
                name: "Weed monitoring",
                type: "monitoring",
                startDay: 15,
                endDay: 40,
                description:
                    "Inspect the field for weeds competing with maize plants."
            },

            {
                name: "Nutrient management",
                type: "fertilizer",
                startDay: 20,
                endDay: 45,
                description:
                    "Evaluate crop nutrient requirements during vegetative growth."
            },

            {
                name: "Pest monitoring",
                type: "monitoring",
                startDay: 25,
                endDay: 75,
                description:
                    "Inspect maize plants for signs of insect and pest infestation."
            },

            {
                name: "Disease monitoring",
                type: "monitoring",
                startDay: 30,
                endDay: 75,
                description:
                    "Inspect leaves and stems for disease symptoms."
            },

            {
                name: "Flowering monitoring",
                type: "monitoring",
                startDay: 41,
                endDay: 65,
                description:
                    "Monitor flowering and reproductive development."
            },

            {
                name: "Grain development monitoring",
                type: "monitoring",
                startDay: 66,
                endDay: 90,
                description:
                    "Monitor grain filling and overall crop development."
            },

            {
                name: "Harvest preparation",
                type: "harvest",
                startDay: 105,
                endDay: 120,
                description:
                    "Monitor crop maturity and prepare for harvesting."
            }
        ]
    }
};


// =========================
// GET CROP CONFIG
// =========================

const getCropActivityConfig = (crop) => {

    if (!crop) {
        return null;
    }

    const normalizedCrop =
        crop.trim().toLowerCase();

    return cropActivityConfig[normalizedCrop] || null;
};


export {
    getCropActivityConfig
};