const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication,
} = require("../controllers/application.controller");
const validateObjectId = require("../middleware/validateObjectId");


router.use(protect);

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:id", validateObjectId, updateApplication);
router.delete("/:id", validateObjectId, deleteApplication);

module.exports = router;
