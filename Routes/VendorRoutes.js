const VendorController=require("../Controller/VendorController");

const express=require("express");

const router=express.Router();

router.post("/register",VendorController.VendorRegister);
router.post("/login",VendorController.VendorLogin);
router.get("/get-vendors",VendorController.getAllVendors);
router.get("/get-single-vendor/:id",VendorController.getVendorById);

module.exports=router;