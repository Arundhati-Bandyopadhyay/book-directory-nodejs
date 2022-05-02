const app =require( "./app");
const mongoose=require("mongoose")
const dotenv=require("dotenv")


dotenv.config({path:"./config/.env"})

//config
const port = process.env.port || 3000;
const server = app.listen(port, () => {
    console.log(`server running  at port no ${port}`);
})


//database connection
mongoose.connect(
    "mongodb://127.0.0.1:27017/BOOKDIRECTORY",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
        if (error) console.log(error);
        else console.log("Database connected");
    }
)
