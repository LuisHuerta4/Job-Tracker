const cron = require("node-cron");
const Application = require("../models/Application");
const transporter = require("../config/mailer");

const sanitizeForEmail = (str) =>
    String(str).replace(/[\r\n]/g, "").substring(0, 100);

const sendReminders = async () => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const applications = await Application.find({
            followUpDate: { $lte: today },
            reminderSent: false,
        }).populate("user");

        for (const app of applications) {
            const company = sanitizeForEmail(app.company);
            const role = sanitizeForEmail(app.role);

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: app.user.email,
                subject: `Follow-up Reminder: ${company}`,
                text: `Reminder to follow up on your ${role} application at ${company}.`,
            });

            app.reminderSent = true;
            await app.save();
        }

        console.log(`Sent ${applications.length} reminders`);
    } catch (error) {
        console.error("Reminder job error:", error.message);
    }
};

// Runs every day at 9 AM
cron.schedule("0 9 * * *", sendReminders);

module.exports = sendReminders;
