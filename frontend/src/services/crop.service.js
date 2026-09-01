import axios from "axios";

const API_URL = "http://localhost:5000/api/crop";

export const recommendCrops = async (cropData) => {
    const response = await axios.post(
        `${API_URL}/recommend`,
        cropData
    );

    return response.data.data.recommendations;
};