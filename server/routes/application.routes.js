const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
    createApplication,
    getApplications,
} = require("../controllers/application.controller");

router.use(protect);

router.post("/", createApplication);
router.get("/", getApplications);

module.exports = router;
