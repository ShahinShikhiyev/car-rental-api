import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    modelName: {
        type: String,
        required: true,
        trim: true
    },
    dailyPrice: {
        type: Number,
        required: true
    },
    year: {
        type: Number
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Car = mongoose.model("Car", carSchema);
export default Car;