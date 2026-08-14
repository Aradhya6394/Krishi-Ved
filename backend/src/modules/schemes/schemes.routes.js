import express from "express";

import {
    getSchemes,
    getScheme,
    addScheme,
    editScheme,
    removeScheme,
    checkEligibility
} from "./schemes.controller.js";

const router = express.Router();

// Farmer-facing routes
router.get("/", getSchemes);

// Eligibility route MUST come before /:id
router.post("/eligible", checkEligibility);

router.get("/:id", getScheme);

// Admin/data-management routes
router.post("/", addScheme);
router.put("/:id", editScheme);
router.delete("/:id", removeScheme);

export default router;