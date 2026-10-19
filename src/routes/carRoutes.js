import express from "express";
import { getCars, createCar, deleteCar } from "../controllers/carController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { validateCar } from "../validations/carValidation.js"; // <-- Əlavə etdik

const router = express.Router();

router.get("/", getCars);
router.post("/", verifyToken, verifyAdmin, validateCar, createCar); // <-- Middleware bura əlavə olundu
router.delete("/:id", verifyToken, verifyAdmin, deleteCar);

export default router;