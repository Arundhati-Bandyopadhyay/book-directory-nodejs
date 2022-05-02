const { cookie } = require("express/lib/response")
const jwt=require("jsonwebtoken");
const User = require("../models/User_models");

exports.isauthenticated=async(req,res,next)=>{
    const { token }=req.cookies;
    if(!token){
        res.status(401).json({
            message:"please login to access the resource"
        })
        const decodedData=jwt.verify(token,process.env.SECRET_KEY);

        req.n_user=await User.findById(decodedData.id)
    }
      
    next();
    
    console.log(token);

}