import axios from "axios";

const fetchGovernmentSchemes = async () => {
    if (!process.env.SCHEMES_API_URL) {
        throw new Error("SCHEMES_API_URL is not configured");
    }

    try {
        const response = await axios.get(
            process.env.SCHEMES_API_URL,
            {
                timeout: 30000
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            "Government schemes API error:",
            error.message
        );

        throw new Error(
            "Failed to fetch government scheme data"
        );
    }
};

export {
    fetchGovernmentSchemes
};