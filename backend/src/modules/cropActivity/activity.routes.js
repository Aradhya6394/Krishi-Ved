import express from "express";

import {
    getCropActivityCalendar
} from "./activity.controller.js";

const router = express.Router();


router.post(
    "/calendar",
    getCropActivityCalendar
);


export default router;