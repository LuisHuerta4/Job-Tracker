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

exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Auth check
        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await application.deleteOne();

        res.json({ message: "Application removed" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
