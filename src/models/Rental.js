import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    startDate: {
        type: Date,
        required: true // Təhvil tarixi[cite: 1]
    },
    endDate: {
        type: Date,
        required: true // Qaytarma tarixi[cite: 1]
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    }
}, {
    timestamps: true
});

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental;