import express from "express";
import { createRental } from "../controllers/rentalController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createRental); 

export default router;