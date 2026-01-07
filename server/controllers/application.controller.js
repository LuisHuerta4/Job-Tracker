const Application = require("../models/Application");

exports.createApplication = async (req, res) => {
    try {
        const application = await Application.create({
            user: req.user._id, // auth middleware
            ...req.body,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
