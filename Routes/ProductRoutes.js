const express=require("express");
const router=express.Router();

const ProductController=require("../Controller/ProductController");
const Product = require("../Model/Product");

router.post("/add-product/:firmId",ProductController.addProduct)
router.get("/:firmId/products",ProductController.getProductByFrim)

router.get("/uploads/:imageName",(req,res)=>
{
    const imageName=req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
})

router.delete("/:productId",ProductController.deleteProductById);
module.exports=router;