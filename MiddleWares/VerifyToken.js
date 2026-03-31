const jwt=require("jsonwebtoken");
const Vendor=require("../Model/Vendor");
const dotenv=require("dotenv");

dotenv.config();

const secret_key = process.env.whatsYourName;

const VerifyToken = async (req, res, next) => {
    try {
        // ✅ Get token directly from headers
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ error: "Token required" });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, secret_key);

        console.log("DECODED:", decoded);

        // ✅ Find vendor
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" }); // ✅ IMPORTANT return
        }

        // ✅ Attach vendor id
        req.vendorId = vendor._id;

        next();

    } catch (error) {
        console.error("ERROR:", error.message); // ✅ show real error
        return res.status(500).json({ error: error.message });
    }
};

module.exports = VerifyToken;