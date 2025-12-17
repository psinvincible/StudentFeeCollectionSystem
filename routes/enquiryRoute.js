const { Router } = require("express");
const { requireLogin } = require("../middlewares/auth");
const { handleShowEnquiry, handleEnquiryResponse, handleSubmitEnquiry, } = require("../controllers/enquiry");


const router = Router();

router.get("/", (req, res) => {
    res.render("enquiry");
});

router.get("/show-enquiry", requireLogin, handleShowEnquiry);

router.get("/respond/:id", handleEnquiryResponse)

router.post("/submit-enquiry", handleSubmitEnquiry);


module.exports = router;


