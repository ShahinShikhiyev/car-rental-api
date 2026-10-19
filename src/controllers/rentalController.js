import Rental from "../models/Rental.js";
import Car from "../models/Car.js";

// Yeni icarə yaratmaq və tarix kəsişməsini yoxlamaq
export const createRental = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;
        const userId = req.user?.id; // Autentifikasiya olunmuş istifadəçi (middleware-dən gələcək)

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            return res.status(400).json({ error: "Qaytarma tarixi təhvil tarixindən sonrakı gün olmalıdır!" });
        }

        // ƏSAS QAYDA: Həmin tarixlərdə bu avtomobil artıq icarədədirmi?
        const conflictingRental = await Rental.findOne({
            car: carId,
            status: "active",
            $or: [
                { startDate: { $lte: end }, endDate: { $gte: start } }
            ]
        });

        if (conflictingRental) {
            return res.status(400).json({ 
                error: "Bu avtomobil seçilmiş tarixlərdə artıq icarədədir! Zəhmət olmasa başqa tarix və ya avtomobil seçin." 
            });
        }

        // Avtomobilin günlük qiymətini tapıb ümumi məbləği hesablayaq
        const car = await Car.findById(carId);
        if (!car || !car.isAvailable) {
            return res.status(404).json({ error: "Avtomobil tapılmadı və ya aktiv deyil." });
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalPrice = diffDays * car.dailyPrice;

        const newRental = new Rental({
            user: userId || req.body.userId, // Test üçün keçici olaraq req.body də dəstəkləyə bilərik
            car: carId,
            startDate: start,
            endDate: end,
            totalPrice
        });

        await newRental.save();
        res.status(201).json({ message: "Avtomobil uğurla icarəyə götürüldü!", rental: newRental });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};