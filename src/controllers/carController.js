import Car from "../models/Car.js";

export const getCars = async (req, res) => {
    try {
        const { search, brand, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        let query = {};

        if (brand) {
            query.brand = brand;
        }

        if (minPrice || maxPrice) {
            query.dailyPrice = {};
            if (minPrice) query.dailyPrice.$gte = Number(minPrice);
            if (maxPrice) query.dailyPrice.$lte = Number(maxPrice);
        }

        if (search) {
            query.modelName = { $regex: search, $options: "i" }; 
        }

        const skip = (Number(page) - 1) * Number(limit);

        const cars = await Car.find(query)
            .populate("brand", "name")
            .skip(skip)
            .limit(Number(limit));

        const total = await Car.countDocuments(query);

        res.status(200).json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            cars
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCar = async (req, res) => {
    try {
        const { brand, modelName, dailyPrice, year } = req.body;

        const newCar = new Car({
            brand,
            modelName,
            dailyPrice,
            year
        });

        await newCar.save();
        res.status(201).json({ message: "Avtomobil uğurla əlavə edildi!", car: newCar });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({ error: "Avtomobil tapılmadı." });
        }

        res.status(200).json({ message: "Avtomobil uğurla silindi." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};