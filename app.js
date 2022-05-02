const express = require("express")
const app=express();
//const bodyParser=require("body-parser")
const upload=require('express-fileupload')
const cors=require('cors')
const cookieParser=require("cookie-parser")



app.use(express.json())
app.use(cookieParser())
app.use(upload())
app.use(cors())

//ROUTE IMPORT
const books=require("./routes/bookRoutes")
const user=require("./routes/userRoutes")
app.use("/api/v1",books);
app.use("/api/v1",user);


module.exports=app;