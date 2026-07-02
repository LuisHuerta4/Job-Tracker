const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000;

const generateToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: TOKEN_TTL,
    });
};

exports.register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error.details[0].message });
        }

        const { email, password } = value;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);
        setAuthCookie(res, token);
        res.status(201).json({ message: "Registered", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error.details[0].message });
        }

        const { email, password } = value;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        setAuthCookie(res, token);
        res.json({ message: "Logged in", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ message: "Logged out" });
};