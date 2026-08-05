import express from "express";
import { getPrices } from "./mandi.controller.js";
import { validateMandiQuery } from "./mandi.validator.js";

const router = express.Router();

// Get mandi prices
router.get("/prices", validateMandiQuery, getPrices);

export default router;