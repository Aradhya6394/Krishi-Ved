import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import weatherRoutes from "./modules/weather/weather.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("KrishiVed API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);


export default app;