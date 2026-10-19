import express from "express";
import Brand from "../models/Brand.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        const newBrand = new Brand({ name });
        await newBrand.save();
        res.status(201).json({ message: "Marka uğurla əlavə edildi!", brand: newBrand });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;