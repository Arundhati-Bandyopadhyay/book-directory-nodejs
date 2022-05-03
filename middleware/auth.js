const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
const User = require("../models/User_models");
//console.log(jwt);


exports.isauthenticated= async (req,res,next)=>{
    try{
    const { token }=req.cookies;
    //console.log(token);
    if(!token){
        res.status(401).json({
            message:"please login to access the resource"
        })
        const decodedData=jwt.verify(token,process.env.SECRET_KEY);4
        console.log(decodedData)
        req.n_user= await User.findById(decodedData.id)
        console.log(decodedData.id);
        console.log(req.n_user);
    }
    next();
}catch(e){
    console.log(e.message);
}
    //console.log(token);

}

//roles
exports.authorizeroles = (...roles) => {
    console.log(...roles); 
  return (req, res, next) => {
    console.log(req.n_user);
    if (!roles.includes(req.n_user.role)) {

        return next(res.status(403).json(
            `Role:${req.n_user.role} is  not allowed to access this resource`
        ))
    }
    next();
}
} 