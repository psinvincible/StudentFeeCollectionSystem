const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        contactInfo: {
            type: Number,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        responded: {
            type: String,
            default: "Not responded",
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher"
        }
    }, {timestamps: true}
)

const Enquiry = mongoose.model("enquiry", enquirySchema);

module.exports = Enquiry;