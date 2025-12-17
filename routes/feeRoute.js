const { Router }  = require("express");

const { handleAddFee, handleShowFee, handleEditFee, handleDeleteFee, handleUpdateFee, handleSubmitFee } = require("../controllers/fee");

const router = Router();

router.get("/add-fee", handleAddFee);

router.get("/show-fee", handleShowFee);

router.get("/edit-fee/:id", handleEditFee)

router.get("/delete/:id", handleDeleteFee);

router.post("/update-fee/:id", handleUpdateFee)

router.post("/submit-fee", handleSubmitFee);


module.exports = router;