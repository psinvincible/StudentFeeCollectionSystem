const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { handleStudentAddForm, handleShowStudent, handleEditStudent, handleAddStudent, handleDeleteStudent, handleUpdateStudent } = require("../controllers/student");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/student/profileImg/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", handleStudentAddForm);

router.get("/show-student", handleShowStudent);

router.get("/edit-student/:id", handleEditStudent);

router.get("/delete/:id", handleDeleteStudent);

router.post("/add-student", upload.single("profileImg"), handleAddStudent);

router.post(
  "/update-student/:id",
  upload.single("profileImg"), handleUpdateStudent
  
);

module.exports = router;
