const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Applied", "Interviewing", "Offer", "Rejected"],
            default: "Applied",
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
        followUpDate: {
            type: Date,
        },
        notes: {
            type: String,
        },
        jobLink: {
            type: String,
        },
        reminderSent: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
