const { Router } = require("express");

const {requireLogin} = require("../middlewares/auth");
const { handleLogout, handleDashboard, handleLogin, handleSignup } = require("../controllers/user");

const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", handleLogout)

router.get("/dashboard", requireLogin, handleDashboard);

router.post("/login", handleLogin);

router.post("/signup", handleSignup);

module.exports = router;