const crops = [
    {
        crop: "Rice",
        ideal: {
            nitrogen: [60, 120],
            phosphorus: [30, 60],
            potassium: [30, 60],
            temperature: [20, 35],
            humidity: [60, 90],
            ph: [5.5, 7.5],
            rainfall: [150, 300]
        }
    },

    {
        crop: "Maize",
        ideal: {
            nitrogen: [50, 100],
            phosphorus: [30, 60],
            potassium: [20, 50],
            temperature: [18, 32],
            humidity: [50, 80],
            ph: [5.5, 7.5],
            rainfall: [50, 150]
        }
    },

    {
        crop: "Wheat",
        ideal: {
            nitrogen: [40, 100],
            phosphorus: [20, 50],
            potassium: [20, 50],
            temperature: [10, 25],
            humidity: [40, 70],
            ph: [6, 7.5],
            rainfall: [30, 100]
        }
    },

    {
        crop: "Cotton",
        ideal: {
            nitrogen: [50, 100],
            phosphorus: [20, 50],
            potassium: [20, 50],
            temperature: [20, 35],
            humidity: [50, 80],
            ph: [5.5, 8],
            rainfall: [50, 150]
        }
    },

    {
        crop: "Chickpea",
        ideal: {
            nitrogen: [20, 60],
            phosphorus: [30, 60],
            potassium: [20, 50],
            temperature: [15, 30],
            humidity: [40, 70],
            ph: [6, 8],
            rainfall: [40, 100]
        }
    },

    {
        crop: "Groundnut",
        ideal: {
            nitrogen: [20, 50],
            phosphorus: [20, 50],
            potassium: [20, 60],
            temperature: [20, 35],
            humidity: [50, 80],
            ph: [5.5, 7],
            rainfall: [50, 150]
        }
    },

    {
        crop: "Soybean",
        ideal: {
            nitrogen: [30, 70],
            phosphorus: [30, 60],
            potassium: [20, 60],
            temperature: [20, 30],
            humidity: [60, 80],
            ph: [6, 7.5],
            rainfall: [60, 200]
        }
    },

    {
        crop: "Potato",
        ideal: {
            nitrogen: [40, 90],
            phosphorus: [30, 60],
            potassium: [40, 80],
            temperature: [15, 25],
            humidity: [60, 80],
            ph: [5, 6.5],
            rainfall: [50, 150]
        }
    },

    {
        crop: "Sugarcane",
        ideal: {
            nitrogen: [80, 150],
            phosphorus: [30, 60],
            potassium: [40, 100],
            temperature: [20, 35],
            humidity: [60, 90],
            ph: [6, 7.5],
            rainfall: [150, 300]
        }
    }
];

export { crops };