const Vendor = require("../Model/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv=require("dotenv");

dotenv.config();
const secrete_key=process.env.whatsYourName;


const VendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 🔍 Check if email already exists
        const vendor = await Vendor.findOne({ email });
        if (vendor) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // 🔐 Hash password
        const HashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create model instance (IMPORTANT)
        const NewVendor = new Vendor({
            username,
            email,
            password: HashedPassword
        });

        // 💾 Save to DB
        await NewVendor.save();

        res.status(200).json({ msg: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const VendorLogin=async(req,res)=>
{
    const{email,password}=req.body;
    try
    {
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password)))
        {
            return res.status(500).json({error:"Invalid email"});
        }
        const token=jwt.sign({vendorId:vendor._id},secrete_key,{expiresIn:"10h"});
        res.status(200).json({msg:"Vendor has logged in successfully ",token});
        console.log(email,token);
    }
    catch(error)
    {
          console.error(error);
        res.status(400).json({ error: "Internal server error" });
    }
}



const getAllVendors=async(req,res)=>
{
    try
    {
        const vendors=await Vendor.find().populate("firm");
        res.json({vendors});

    }
    catch(error)
    {
        res.status(500).json({error:"Internal error"});
    }
}


const getVendorById=async(req,res)=>
{
    const vendorId=req.params.id;
    try
    {
        const vendor=await Vendor.findById(vendorId).populate("firm");
        if(!vendor)
        {
            return res.status(400).json({message:"Vendor not found"});
        }
        res.status(200).json({vendor});
    }
    catch(err)
    {
         res.status(500).json({err:"Internal error"});
    }
}
module.exports = { VendorRegister,VendorLogin,getAllVendors,getVendorById};




