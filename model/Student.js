const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        class: {
            type: Number,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        profileImgURL: {
            type: String,
            default: "/student/profileImg/default.png",
        },
        address: {
            type: String,
            required: true,
        },
        contactNo: {
            type: Number,
            required: true,
        },
        dateOfJoin: {
            type: Date,
            required: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher",
        },
    },{timestamps: true},
)

const Student = mongoose.model("student", studentSchema);

module.exports = Student;