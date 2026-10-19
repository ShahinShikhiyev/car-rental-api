import express from "express";
import { getCars, createCar, deleteCar } from "../controllers/carController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { validateCar } from "../validations/carValidation.js"; 

const router = express.Router();

router.get("/", getCars);
router.post("/", verifyToken, verifyAdmin, validateCar, createCar); 
router.delete("/:id", verifyToken, verifyAdmin, deleteCar);

export default router;