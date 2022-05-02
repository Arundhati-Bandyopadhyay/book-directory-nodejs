const mongoose=require("mongoose")
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        default:"----"
    },
    isbn:{
      type:Number,
      unique:true,
    },
    author:{
        type:String,
        default:"----"
    },
    filesdoc:{
        type:String,
       // default:"----"
    }
});
const bookmodel = mongoose.model('books',bookSchema);
module.exports = bookmodel;