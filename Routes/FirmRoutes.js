const express=require("express");
const router=express.Router();
const verifyToken=require("../MiddleWares/VerifyToken");
const FirmController=require("../Controller/FirmController");

router.post("/add-firm",verifyToken,FirmController.addFirm);
router.get("/uploads/:imageName",(req,res)=>
{
    const imageName=req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
})

router.delete("/:firmId",FirmController.deleteFirmById);

module.exports=router;
