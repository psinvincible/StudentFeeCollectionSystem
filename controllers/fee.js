const FeeCollection = require("../model/FeeCollection");

const handleAddFee = (req, res) => {
    res.render("add-fee", {
        fee: null,
    });
}

const handleShowFee = async(req, res) => {
    if(req.user.role === "TEACHER"){
        const feeCollection = await FeeCollection.find({teacherId: req.user._id});
    res.render("show-fee", {
        feeCollection,
        user: req.user,
    });
    }else if( req.user.role === "ADMIN"){
        const feeCollection = await FeeCollection.find();
    res.render("show-fee", {
        feeCollection,
    });
    } 
}

const handleEditFee = async (req, res) => {
    const editFee = await FeeCollection.findById({_id: req.params.id});
    res.render("add-fee", {fee: editFee});
}

const handleDeleteFee = async(req, res) => {
    const feeDeleted = await FeeCollection.deleteOne({_id: req.params.id})
    res.redirect("/show-fee");
}

const handleUpdateFee = async (req, res) => {
    const body = req.body;
    const updatedFee = await FeeCollection.findByIdAndUpdate(req.params.id, {
        fullName: body.fullName,
        class: body.class,
        school: body.school,
        amount: body.amount,
        dateOfPayment: body.dop,
        paymentMode: body.paymentMode,
        updatedAt: Date.now(),
    })
    res.redirect("/fee/show-fee");
}

const handleSubmitFee = async (req, res) => {
    const body = req.body;
    await FeeCollection.create({
        fullName: body.fullName,
        class: body.class,
        school: body.school,
        amount: body.amount,
        dateOfPayment: body.dop,
        paymentMode: body.paymentMode,
        teacherId: req.user._id,
        updatedAt: Date.now(),
    })
    res.redirect("/");
}


module.exports = {
    handleAddFee, handleShowFee, handleEditFee, handleDeleteFee, handleUpdateFee, handleSubmitFee,
}