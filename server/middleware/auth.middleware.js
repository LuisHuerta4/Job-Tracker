// JWT_SECRET = the stamp used to sign tickets (server-only)
// JWT token = the stamped ticket given to a user
// Protected route = security guard checking the ticket

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized" });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized" });
        }
    } else if (req.cookies?.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized" });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};

module.exports = protect;
