import Scheme from "./schemes.model.js";

const getAllSchemes = async (filters = {}) => {
    const query = {};

    if (filters.state) {
        query.state = filters.state;
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.search) {
        query.$or = [
            {
                name: {
                    $regex: filters.search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: filters.search,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: filters.search,
                    $options: "i"
                }
            }
        ];
    }

    return await Scheme.find(query).sort({
        lastUpdated: -1
    });
};
const getEligibleSchemes = async (farmer) => {
    const schemes = await Scheme.find();

    const eligibleSchemes = schemes.filter((scheme) => {
        const criteria = scheme.eligibilityCriteria || {};

        // State check
        if (
            criteria.states &&
            criteria.states.length > 0 &&
            !criteria.states.some(
                (state) =>
                    state.toLowerCase() === farmer.state.toLowerCase()
            )
        ) {
            return false;
        }

        // Farmer category check
        if (
            criteria.farmerCategories &&
            criteria.farmerCategories.length > 0 &&
            !criteria.farmerCategories.some(
                (category) =>
                    category.toLowerCase() ===
                    farmer.farmerCategory.toLowerCase()
            )
        ) {
            return false;
        }

        // Occupation check
        if (
            criteria.occupations &&
            criteria.occupations.length > 0 &&
            !criteria.occupations.some(
                (occupation) =>
                    occupation.toLowerCase() ===
                    farmer.occupation.toLowerCase()
            )
        ) {
            return false;
        }

        // Gender check
        if (
            criteria.gender &&
            criteria.gender.length > 0 &&
            !criteria.gender.some(
                (gender) =>
                    gender.toLowerCase() ===
                    farmer.gender.toLowerCase()
            )
        ) {
            return false;
        }

        // Minimum land-size check
        if (
            criteria.minLandSize !== null &&
            farmer.landSize < criteria.minLandSize
        ) {
            return false;
        }

        // Maximum land-size check
        if (
            criteria.maxLandSize !== null &&
            farmer.landSize > criteria.maxLandSize
        ) {
            return false;
        }

        return true;
    });

    return eligibleSchemes;
};

const getSchemeById = async (schemeId) => {
    return await Scheme.findById(schemeId);
};

const createScheme = async (schemeData) => {
    const scheme = await Scheme.create(schemeData);

    return scheme;
};

const updateScheme = async (schemeId, schemeData) => {
    return await Scheme.findByIdAndUpdate(
        schemeId,
        schemeData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteScheme = async (schemeId) => {
    return await Scheme.findByIdAndDelete(schemeId);
};

export {
    getAllSchemes,
    getSchemeById,
    createScheme,
    updateScheme,
    deleteScheme,
    getEligibleSchemes
};