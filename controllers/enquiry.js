const Enquiry = require("../model/Enquiry");


const handleShowEnquiry = async(req, res) => {
    const enquiry = await Enquiry.find().populate("teacherId", "fullName");
    res.render("show-enquiry", {
        enquiries: enquiry,        
    });
};

const handleEnquiryResponse = async(req, res) => {
    const respondUpdate = await Enquiry.findByIdAndUpdate(req.params.id, {
        teacherId: req.user._id,
        responded: "Yes"
    });
    res.redirect("/enquiry/show-enquiry");
};

const handleSubmitEnquiry = async (req, res) => {
    const body = req.body;
    const enquiry = await Enquiry.create({
        name: body.name,
        contactInfo: body.contact,
        details: body.enquiry,
    })
    res.redirect("/enquiry");
}


module.exports = {
    handleShowEnquiry, handleEnquiryResponse, handleSubmitEnquiry,
}