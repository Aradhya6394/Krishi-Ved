import express from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import weatherRoutes from "./modules/weather/weather.routes.js";
import cropRoutes from "./modules/crop/crop.routes.js";
import diseaseRoutes from "./modules/disease/disease.routes.js";
import mandiRoutes from "./modules/mandi/mandi.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import schemeRoutes from "./modules/schemes/schemes.routes.js";
import irrigationRoutes from "./modules/irrigation/irrigation.routes.js";
import cropActivityRoutes from "./modules/cropActivity/activity.routes.js"; 
import chatbotRoutes from "./modules/chatbot/chatbot.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("KrishiVed API is running...");
});

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/mandi", mandiRoutes);
app.use(errorHandler);
app.use("/api/schemes", schemeRoutes);
app.use("/api/irrigation", irrigationRoutes);
app.use("/api/crop-activity",cropActivityRoutes);
app.use("/api/chatbot", chatbotRoutes);
    
    


export default app;