require("dotenv").config();
const mongoose=require("mongoose");

mongoose.connect(process.env.URL)
.then(()=>{
    console.log("conn successful");
}).catch((e)=>{
    console.log("conn failed"+ e);
})