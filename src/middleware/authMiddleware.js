import jwt from "jsonwebtoken";

// Token yoxlamaq (Giriş edib-etmədiyini yoxlamaq üçün)
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Giriş tələb olunur, token tapılmadı!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // İstifadəçi məlumatlarını req.user-ə yazırıq
        next();
    } catch (error) {
        return res.status(403).json({ error: "Yanlış və ya vaxtı bitmiş token!" });
    }
};

// Admin rolunu yoxlamaq üçün middleware
export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ error: "Bu əməliyyat üçün yalnız Admin səlahiyyəti tələb olunur!" });
    }
};