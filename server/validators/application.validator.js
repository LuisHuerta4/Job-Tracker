const Joi = require("joi");

const createApplicationSchema = Joi.object({
    company: Joi.string().trim().min(1).max(255).required(),
    role: Joi.string().trim().min(1).max(255).required(),
    status: Joi.string()
        .valid("Applied", "Interviewing", "Offer", "Rejected")
        .default("Applied"),
    appliedDate: Joi.date().optional(),
    followUpDate: Joi.date().optional().allow(null),
    notes: Joi.string().trim().max(5000).optional().allow(""),
    jobLink: Joi.string().uri().max(2048).optional().allow(""),
});

const updateApplicationSchema = Joi.object({
    company: Joi.string().trim().min(1).max(255),
    role: Joi.string().trim().min(1).max(255),
    status: Joi.string().valid("Applied", "Interviewing", "Offer", "Rejected"),
    appliedDate: Joi.date(),
    followUpDate: Joi.date().allow(null),
    notes: Joi.string().trim().max(5000).allow(""),
    jobLink: Joi.string().uri().max(2048).allow(""),
})
    .min(1)
    .messages({ "object.min": "At least one field must be provided" });

module.exports = { createApplicationSchema, updateApplicationSchema };
