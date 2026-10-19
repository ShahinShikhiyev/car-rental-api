import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer" // Tələbdə minimum 2 rol tələb olunur[cite: 1]
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;