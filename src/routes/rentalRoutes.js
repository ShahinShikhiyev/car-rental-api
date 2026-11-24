import express from "express";
import { createRental, returnRental } from "../controllers/rentalController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createRental);
router.patch("/:id/return", verifyToken, returnRental);

export default router;