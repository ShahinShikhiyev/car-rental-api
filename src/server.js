import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Route-ların qeydiyyatı
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/brands", brandRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Car Rental API is running" });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();