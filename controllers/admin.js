const Student = require("../model/Student");
const FeeCollection = require("../model/FeeCollection");
const Teacher = require("../model/Teacher");

const handleAdminDashboard = async(req, res) => {
    const teacherData = await Teacher.find();
    const studentData = await Student.find();
    const fee = await FeeCollection.find();
    let totalCollection = 0;
    fee.forEach(feeAmount => {
        totalCollection += feeAmount.amount;
    });    
    res.render("adminDashboard", {
        teacherData, studentData, totalCollection
    });
}

module.exports = {
    handleAdminDashboard,
}
