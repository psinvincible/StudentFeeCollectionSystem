const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
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
        amount: {
            type: Number,
            required: true,
        },
        dateOfPayment: {
            type: Date,
            required: true,
        },
        paymentMode: {
            type: String,
            required: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teacher",
        },
    },{timestamps: true}
);

const FeeCollection = mongoose.model("feeCollection", feeSchema);

module.exports = FeeCollection;