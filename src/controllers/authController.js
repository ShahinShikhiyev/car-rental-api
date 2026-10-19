import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Qeydiyyat (Register)
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // E-poçt mövcuddurmu yoxlayaq
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Bu e-poçt ünvanı artıq istifadə olunub!" });
        }

        // Şifrəni hash-ləyirik (bcrypt ilə)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "customer"
        });

        await newUser.save();
        res.status(201).json({ message: "İstifadəçi uğurla qeydiyyatdan keçdi!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Giriş (Login)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "E-poçt və ya şifrə yanlışdır!" });
        }

        // Şifrəni yoxlayırıq
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "E-poçt və ya şifrə yanlışdır!" });
        }

        // JWT token yaradırıq
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        res.status(200).json({
            message: "Uğurla daxil oldunuz!",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};