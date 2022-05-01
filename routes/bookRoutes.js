const express=require("express");
const { bookRegister, getAllBooks, findbook } = require("../api");

const router=express.Router();


router.route("/book_register").post(bookRegister) 

router.route("/getAllBooks").get(getAllBooks)

router.route("/findbook/:id").get(findbook)

module.exports=router;






