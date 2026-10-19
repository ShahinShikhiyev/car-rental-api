import { body, validationResult } from "express-validator";

export const validateCar = [
    body("modelName").notEmpty().withMessage("Avtomobilin modeli boş ola bilməz!"),
    body("dailyPrice").isNumeric().withMessage("Günlük qiymət rəqəm olmalıdır!"),
    body("brand").notEmpty().withMessage("Marka ID-si mütləq qeyd edilməlidir!"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];