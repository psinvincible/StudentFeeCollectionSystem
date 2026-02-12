const Student = require("../model/Student");
const FeeCollection = require("../model/FeeCollection");
const Teacher = require("../model/Teacher");

const handleLogout = (req, res) => {
    res.clearCookie("token").redirect("/");
}

const handleDashboard = async(req, res) => {
    const studentCount = await Student.find({teacherId: req.user._id});
    const fee = await FeeCollection.find({teacherId: req.user._id});
    let totalCollection = 0;
    fee.forEach(feeAmount => {
        totalCollection += feeAmount.amount;
    });
    res.render("dashboard", {
    stats: {
      students: studentCount.length,
      totalFees: totalCollection,
    }
})
}

const handleLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await Teacher.matchPasswordAndGenerateToken(email, password);
        // Set cookie options for development and production
        const isProduction = process.env.NODE_ENV === "production";
        const cookieOptions = {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction ? true : false
        };
        if(userData.role === "TEACHER"){
            return res.cookie("token", userData.token, cookieOptions).redirect("/user/dashboard");
        }else if(userData.role === "ADMIN") {
            return res.cookie("token", userData.token, cookieOptions).redirect("/admin");
        }        
    } catch (error) {
        res.render("login", {
            error: "Incorrect Password"
        })       
    }
}

const handleSignup = async (req, res) => {
    const body = req.body;
    const teacher = await Teacher.create({
        fullName: body.fullName,
        email: body.email,
        password: body.password,
    });
    console.log(teacher);
    res.redirect("/user/login");
}

module.exports = {
    handleLogout, handleDashboard, handleLogin, handleSignup,
}