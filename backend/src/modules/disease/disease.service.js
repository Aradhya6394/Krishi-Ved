import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const detectDisease = async ({ crop, imagePath }) => {
    if (!imagePath) {
        throw new Error("Disease image is required");
    }

    const formData = new FormData();

    formData.append(
        "image",
        fs.createReadStream(imagePath)
    );

    try {
        const response = await axios.post(
            "http://127.0.0.1:5001/predict",
            formData,
            {
                headers: {
                    ...formData.getHeaders()
                },
                timeout: 120000
            }
        );

        return {
            crop,
            ...response.data
        };

    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            throw new Error(
                "Disease detection ML service is not running"
            );
        }

        if (error.response) {
            throw new Error(
                error.response.data?.message ||
                "Disease detection service failed"
            );
        }

        throw error;
    }
};

export { detectDisease };