const Application = require("../models/Application");
const { createApplicationSchema, updateApplicationSchema } = require("../validators/application.validator");

exports.createApplication = async (req, res) => {
    try {
        const { error, value } = createApplicationSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error.details[0].message });
        }

        const application = await Application.create({
            user: req.user._id,
            ...value,
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
        const { error, value } = updateApplicationSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error.details[0].message });
        }

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true, runValidators: true }
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
            return res.status(403).json({ message: "Not authorized" });
        }

        await application.deleteOne();

        res.json({ message: "Application removed" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};