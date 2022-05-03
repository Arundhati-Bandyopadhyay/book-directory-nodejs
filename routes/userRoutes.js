const express=require("express");
const { isauthenticated } = require("../middleware/auth");
const { registerUser, login, logoutuser } = require("../user_api");

const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").get(login)
router.route("/logout").get(logoutuser)


module.exports=router;