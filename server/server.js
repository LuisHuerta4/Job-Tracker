const dotenv = require("dotenv");
dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "EMAIL_USER", "EMAIL_PASS"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`ERROR: Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

if (process.env.JWT_SECRET.length < 32) {
    console.error("ERROR: JWT_SECRET must be at least 32 characters long");
    process.exit(1);
}

const app = require("./app");
const connectDB = require("./config/db");

connectDB();
require("./jobs/reminder.job");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});