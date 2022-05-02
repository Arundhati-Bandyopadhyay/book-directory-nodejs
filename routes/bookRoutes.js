const express=require("express");
const { bookRegister, getAllBooks, findbook, updatebook, deletebook } = require("../api");
const { isauthenticated } = require("../middleware/auth");

const router=express.Router();


router.route("/book_register").post(bookRegister) 
router.route("/getAllBooks").get(isauthenticated,getAllBooks)
router.route("/findbook/:id").get(findbook)
router.route("/updatebook/:id").put(updatebook)
router.route("/deletebook/:id").delete(deletebook)


module.exports=router;






