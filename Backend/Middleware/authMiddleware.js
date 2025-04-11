const jwt = require("jsonwebtoken");
const User = require("../Models/User"); // Import the User model
require("dotenv").config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "thisisme"; // Use env variable

exports.verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        req.user = user; // Store user info in request
        next(); // Continue to the controller
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
