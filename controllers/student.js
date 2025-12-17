const Student = require("../model/Student");
const { unlinkSync } = require("fs");

const handleStudentAddForm = (req, res) => {
  res.render("add-student", { student: null });
}

const handleShowStudent = async (req, res) => {
  if(req.user.role === "TEACHER"){
    const students = await Student.find({teacherId: req.user._id});
  res.render("show-student", { students });
  }else if(req.user.role === "ADMIN"){
    const students = await Student.find();
    res.render("show-student", { students });
  }
}

const handleEditStudent = async (req, res) => {
  const editStudent = await Student.findById({ _id: req.params.id });
  res.render("add-student", { student: editStudent });
}

const handleDeleteStudent = async (req, res) => {
  const { profileImgURL } = await Student.findOne({_id: req.params.id});
  if(profileImgURL){
    unlinkSync(`./public${profileImgURL}`)
  }
  const studentDeleted = await Student.deleteOne({ _id: req.params.id });
  res.redirect("/student/show-student");
}

const handleAddStudent = async (req, res) => {
  const body = req.body;
  const student = await Student.create({
    fullName: body.studentName,
    class: body.class,
    school: body.school,
    profileImgURL: req.file
      ? `/student/profileImg/${req.file.filename}`
      : undefined,
    address: body.address,
    contactNo: body.contact,
    dateOfJoin: body.doj,
    teacherId: req.user._id,
  });
  res.redirect("/student/show-student");
}

const handleUpdateStudent = async(req, res) => {
    const body = req.body;
    console.log(req.params.id)
    let oldProfileImgURL = body.oldProfileImg;

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
      fullName: body.studentName,
      class: body.class,
      school: body.school,
      profileImgURL: req.file
        ? `/student/profileImg/${req.file.filename}`
        : oldProfileImgURL,
      address: body.address,
      contactNo: body.contact,
      dateOfJoin: body.doj,
      updatedAt: Date.now(),
    });
    res.redirect("/student/show-student");
  }

module.exports = {
    handleStudentAddForm, handleShowStudent, handleEditStudent, handleDeleteStudent, handleAddStudent, handleUpdateStudent,
}