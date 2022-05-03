const express = require("express");
const bookmodel = require("./models/Book_Models");
const app = require("./app");

//create book dir
exports.bookRegister = async (req, res) => {
  try {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const author = req.body.author;

    const bookexist = await bookmodel.findOne({ isbn: isbn });
    if (bookexist) return res.send("the book already exist");
    let filename;
    if (req.files) {
      
      const ext = req.files.filesdoc.name.split(".");
      console.log(ext);
      console.log(ext[1]);

      if (ext[1] !== "pdf") {
        return res.status(400).json({ message: "Please upload pdf only" });
      }
      filename = Date.now() + "_" + req.files.filesdoc.name;

      let uploadPath = __dirname + "/uploads/" + filename;
      req.files.filesdoc.mv(uploadPath, (err) => {
        if (err) {
          return res.send(err);
        }
      });

      await bookmodel.create({ title, isbn, author, filesdoc: filename });
      res.status(200).json({
        message: "OK",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//get all books
exports.getAllBooks = async (req, res) => {
  const bookList = await bookmodel.find();
  //console.log(bookList);
  res.status(200).json({
    bookList,
  });
};
//findbook by id
exports.findbook = async (req, res) => {
  try {
    const { id } = req.params;
    const findbook = await bookmodel.findOne({ isbn: id });
    console.log(findbook);
    res.status(200).json({
      findbook,
    });
  } catch (e) {
    console.log(e);
  }
};

//updatebooks
exports.updatebook = async(req, res) => {
  const { id } = req.params;

  const bookexist=await bookmodel.findOne({ id })

  if(!bookexist){

  }
  updatedbook=await bookmodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    message:"updated",
    updatedbook
  })
 };

 //deletedbook
 exports.deletebook=async (req, res)=> {
  const { id } = req.params;
  const bookExist = await bookmodel.findOne({isbn : id});
  if (!bookExist) return res.send('Book Do Not exist');
 await bookmodel.deleteOne({ isbn: id })
 res.status(200).json({
   message:"deleted"
 })
 }