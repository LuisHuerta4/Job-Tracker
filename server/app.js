const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();

// Trust the first proxy (Render, etc.) so rate limiting and HTTPS redirect work correctly
app.set("trust proxy", 1);

// HTTPS redirect in production (only behind a reverse proxy)
if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        const proto = req.header("x-forwarded-proto");
        if (proto && proto !== "https") {
            return res.redirect(`https://${req.header("host")}${req.url}`);
        }
        next();
    });
}

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Rate limiters
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

// Routes
app.use("/api/auth", authLimiter, require("./routes/auth.routes"));
app.use("/api/applications", apiLimiter, require("./routes/application.routes"));

module.exports = app;