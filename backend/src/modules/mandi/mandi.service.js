import axios from "axios";

const BASE_URL = "https://api.ceda.ashoka.edu.in/v1";

const getHeaders = () => ({
    Authorization: `Bearer ${process.env.CEDA_API_KEY}`,
    Accept: "application/json"
});



// Get commodities from CEDA
export const getMandiCommodities = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/agmarknet/commodities`,
            {
                headers: getHeaders()
            }
        );

        return response.data.output.data;

    } catch (error) {
        console.error(
            "CEDA commodities error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to fetch commodities");
    }
};

// Get states and districts from CEDA
export const getGeographies = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/agmarknet/geographies`,
            {
                headers: getHeaders()
            }
        );

        return response.data.output.data;

    } catch (error) {
        console.error(
            "CEDA geographies error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to fetch geographies");
    }
};
// Market
export const getMarkets = async (
    commodityId,
    stateId,
    districtId,
    indicator = "price"
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/agmarknet/markets`,
            {
                commodity_id: commodityId,
                state_id: stateId,
                district_id: districtId,
                indicator: indicator
            },
            {
                headers: getHeaders()
            }
        );

        return response.data.output.data;

    } catch (error) {
        console.error(
            "CEDA markets error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to fetch markets");
    }
};
// get prices
export const getPrices = async ({
    commodityId,
    stateId,
    districtIds,
    marketIds,
    fromDate,
    toDate
}) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/agmarknet/prices`,
            {
                commodity_id: commodityId,
                state_id: stateId,
                district_id: districtIds,
                market_id: marketIds,
                from_date: fromDate,
                to_date: toDate
            },
            {
                headers: getHeaders()
            }
        );

        return response.data.output.data;

    } catch (error) {
        console.error(
            "CEDA prices error:",
            error.response?.data || error.message
        );

        throw new Error("Unable to fetch prices");
    }
};