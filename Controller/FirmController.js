const Firm = require("../Model/Firm");
const Vendor = require("../Model/Vendor");
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

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" }); // ✅ FIX
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image, // ✅ FIX
            vendor: vendor._id
        });

        const SavedFirm=await firm.save();
        vendor.firm.push(SavedFirm);
        await vendor.save();

        res.status(200).json({ message: "Firm added successfully" });

    } catch (error) {
        console.error("ADD FIRM ERROR:", error); // ✅ DEBUG
        res.status(500).json({ error: error.message });
    }
};



const deleteFirmById=async(req,res)=>
 {
    try
    {
          const FirmId=req.parms.FirmId;
     const DeleteFirm=await Firm.findByIdAndDelete(FirmId);
     if(!DeleteFirm)
        {
            return res.status(400).json({message:"Firm is not deleted"});
        }
        res.status(200).json({message:"Firm deleted Successfully"});
    }
     catch(err)
      {
          console.error(err);
          res.status(500).json({message:"Internal error"});
      }
 }
module.exports = { addFirm: [upload.single("image"), addFirm] ,deleteFirmById};