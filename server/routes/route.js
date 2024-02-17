const express = require("express");
const router = express.Router();
const {getUser} = require("../functions/user")
const {register,login} = require("../functions/auth")

router.post("/getUser",getUser);
router.post("/register",register);
router.post("/login",login);




module.exports = router;