const API_BASE_URL = "http://localhost:5000/api/crop";

const recommendCrops = async (cropData) => {
    const response = await fetch(
        `${API_BASE_URL}/recommend`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cropData),
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Failed to generate crop recommendations"
        );
    }

    return result.data.recommendations;
};

export {
    recommendCrops
};