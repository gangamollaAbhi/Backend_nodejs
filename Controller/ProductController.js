const Product=require("../Model/Product");
const Firm=require("../Model/Firm");


const multer = require("multer");
const path = require("path"); // ✅ FIX

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });


const addProduct=async(req,res)=>
{
    try
    {

        //getting fields form the body
       const{productName,price,category,bestSeller,description}=req.body;
       const  image = req.file ? req.file.filename : undefined;
       //getting frimId from the params
       const firmId=req.params.firmId;
       const firm=await Firm.findById(firmId);
       if(!firm){
          return res.status(400).json({message:"Firm not found"});
       }

       //cretaing a model instance
       const product=new Product(
        {
            productName,price,category,image,bestSeller,description,firm:firm._id
        }
       );
       const SavedProduct=await product.save();
       firm.product.push(SavedProduct);
       firm.save();
       res.status(200).json({SavedProduct});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"Internal error"});
    }
}


//  const getProductByFrim=async(req,res)=>
//  {
//       try
//       {
//           const firmId=req.params.firmId;
//           const firm=await Firm.findById(firmId);
//           if(!firm)
//           {
//               return res.status(400).json({msg:"Firm not found"});
//           }
//           const RestaurantName=firm.firmName;
//           const Products=await Product.find({firm:firmId});
//           res.status(200).json({RestaurantName,Products});
//       }
//       catch(err)
//       {
//           console.error(err);
//           res.status(500).json({message:"Internal error"});
//       }
//  }


 const deleteProductById=async(req,res)=>
 {
    try
    {
        const ProductId=req.params.ProductId;
     const DeleteProduct=await Product.findByIdAndDelete(ProductId);
     if(!DeleteProduct)
        {
            return res.status(400).json({message:"Product is not deleted"});
        }
        res.status(200).json({message:"Product deleted Successfully"});
    }
     catch(err)
      {
          console.error(err);
          res.status(500).json({message:"Internal error"});
      }
 }



 const getProductByFrim=async(req,res)=>
 {
      try
      {
            const firmId=req.params.firmId;
            const firm=await Firm.findById(firmId); 
            if(!firm)
            {
                 return res.status(400).json({message:"Firm not found"});
            }
            const restaurantName=firm.firmName;
            const products= await Product.find({firm:firm._id});
            res.status(200).json({restaurantName,products});
      }
      catch(err)
      {
          console.log(err);
          res.status(500).json({message:"Internal Error"});   
      }
 }





// const deleteProductById=async(req,res)=>
// {
//     try
//     {
//           const ProductId=req.params.ProductId;
//     const DeleteProductId=await Product.findByIdAndDelete(ProductId);
//     if(!DeleteProductId)
//     {
//          return res.status(400).json({message:"The Product is not deleted"});

//     }
//     res.status(200).json({message:"The Product is deleted"});
    
//     }

//      catch(err)
//       {
//           console.log(err);
//           res.status(500).json({message:"Internal Error"});   
//       }

// }


module.exports = { addProduct: [upload.single("image"), addProduct],getProductByFrim,deleteProductById };




