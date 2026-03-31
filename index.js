const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const VendorRoutes=require("./Routes/VendorRoutes");
const bodyParser=require("body-parser");
const FirmRoutes=require("./Routes/FirmRoutes");
const ProductRoutes=require("./Routes/ProductRoutes");
const path=require("path");
const cors=require("cors");
const app=express();



app.use(bodyParser.json());
app.use('/vendor',VendorRoutes);
app.use('/firm',FirmRoutes);
app.use('/product',ProductRoutes);

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>
{
    console.log("your mongoDB is connected successfully ");
}).catch(()=>
{
    console.log("your mongoDb is not connected ");
});




const PORT=4000;

app.listen(PORT,()=>
{
    console.log(`your server started on the port number ${PORT}`);
})

app.use('/home',(req,res)=>
{
    res.send("Hi this is Abhishek");   
})