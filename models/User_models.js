const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    idno:{
        type:Number,
        required:true,
        maxlength:5
    },
    email:{
        type:String,
        unique:[true,"this email is already used"],
        required:true,
        validate:{ 
            validator : validator.isEmail,
            message:'EMAIL IS INVALID',
            isAsync:false
                  }
    
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[4,"password should be grater than 4 characters"],
       // select:false
    },
    role:{
        type:String,
        default:"user"
    },

    
})
//hashing
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10)
})

//jwt token
userSchema.methods.getJWTToken=function (){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compared password
userSchema.methods.comparePassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
    
}
module.exports=mongoose.model("User",userSchema)

