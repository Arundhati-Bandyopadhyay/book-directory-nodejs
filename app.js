const express = require("express")
const app=express();
//const bodyParser=require("body-parser")
const upload=require('express-fileupload')
const cors=require('cors')



app.use(express.json())
//app.use(bodyParser())
app.use(upload())
app.use(cors())

//ROUTE IMPORT
const books=require("./routes/bookRoutes")
app.use("/api/v1",books);


module.exports=app;