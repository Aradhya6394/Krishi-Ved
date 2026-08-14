const CROP_CONFIG = {
    wheat: {
        stages: [
            {
                name: "initial",
                maxDays: 20,
                kc: 0.4
            },
            {
                name: "development",
                maxDays: 50,
                kc: 0.7
            },
            {
                name: "mid-season",
                maxDays: 90,
                kc: 1.15
            },
            {
                name: "late-season",
                maxDays: 120,
                kc: 0.4
            }
        ]
    },

    rice: {
        stages: [
            {
                name: "initial",
                maxDays: 30,
                kc: 1.05
            },
            {
                name: "development",
                maxDays: 60,
                kc: 1.1
            },
            {
                name: "mid-season",
                maxDays: 110,
                kc: 1.2
            },
            {
                name: "late-season",
                maxDays: 130,
                kc: 0.9
            }
        ]
    },

    maize: {
        stages: [
            {
                name: "initial",
                maxDays: 20,
                kc: 0.4
            },
            {
                name: "development",
                maxDays: 50,
                kc: 0.8
            },
            {
                name: "mid-season",
                maxDays: 90,
                kc: 1.2
            },
            {
                name: "late-season",
                maxDays: 120,
                kc: 0.6
            }
        ]
    },

    potato: {
        stages: [
            {
                name: "initial",
                maxDays: 25,
                kc: 0.5
            },
            {
                name: "development",
                maxDays: 55,
                kc: 0.75
            },
            {
                name: "mid-season",
                maxDays: 90,
                kc: 1.15
            },
            {
                name: "late-season",
                maxDays: 120,
                kc: 0.75
            }
        ]
    },

    tomato: {
        stages: [
            {
                name: "initial",
                maxDays: 25,
                kc: 0.6
            },
            {
                name: "development",
                maxDays: 50,
                kc: 0.8
            },
            {
                name: "mid-season",
                maxDays: 90,
                kc: 1.15
            },
            {
                name: "late-season",
                maxDays: 120,
                kc: 0.8
            }
        ]
    }
};

const getCropConfig = (crop) => {
    const cropKey = crop.toLowerCase().trim();

    return CROP_CONFIG[cropKey] || null;
};

export {
    CROP_CONFIG,
    getCropConfig
};