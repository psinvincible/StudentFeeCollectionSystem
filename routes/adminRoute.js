const { Router } = require("express");
const { requireLogin } = require("../middlewares/auth");
const { handleAdminDashboard } = require("../controllers/admin");


const router = Router();

router.get("/", requireLogin, handleAdminDashboard)

module.exports = router;