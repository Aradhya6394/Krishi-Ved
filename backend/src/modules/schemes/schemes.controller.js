import {
    getAllSchemes,
    getSchemeById,
    createScheme,
    updateScheme,
    deleteScheme,
    getEligibleSchemes
} from "./schemes.service.js";

const getSchemes = async (req, res) => {
    try {
        const { state, category, search } = req.query;

        const schemes = await getAllSchemes({
            state,
            category,
            search
        });
        res.status(200).json({
            success: true,
            data: schemes
        });
    } catch (error) {
        console.error("Get schemes error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch government schemes",
            error: error.message
        });
    }
};

const getScheme = async (req, res) => {
    try {
        const { id } = req.params;

        const scheme = await getSchemeById(id);

        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: "Government scheme not found"
            });
        }

        res.status(200).json({
            success: true,
            data: scheme
        });
    } catch (error) {
        console.error("Get scheme error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch government scheme",
            error: error.message
        });
    }
};

const addScheme = async (req, res) => {
    try {
        const scheme = await createScheme(req.body);

        res.status(201).json({
            success: true,
            message: "Government scheme created successfully",
            data: scheme
        });
    } catch (error) {
        console.error("Create scheme error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create government scheme",
            error: error.message
        });
    }
};

const editScheme = async (req, res) => {
    try {
        const { id } = req.params;

        const scheme = await updateScheme(id, req.body);

        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: "Government scheme not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Government scheme updated successfully",
            data: scheme
        });
    } catch (error) {
        console.error("Update scheme error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update government scheme",
            error: error.message
        });
    }
};

const removeScheme = async (req, res) => {
    try {
        const { id } = req.params;

        const scheme = await deleteScheme(id);

        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: "Government scheme not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Government scheme deleted successfully"
        });
    } catch (error) {
        console.error("Delete scheme error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete government scheme",
            error: error.message
        });
    }
};
const checkEligibility = async (req, res) => {
    try {
        const farmer = req.body;

        const eligibleSchemes = await getEligibleSchemes(farmer);

        res.status(200).json({
            success: true,
            count: eligibleSchemes.length,
            data: eligibleSchemes
        });
    } catch (error) {
        console.error("Scheme eligibility error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to check scheme eligibility",
            error: error.message
        });
    }
};

export {
    getSchemes,
    getScheme,
    addScheme,
    editScheme,
    removeScheme,
    checkEligibility
};