const express = require("express");
const router = express.Router();
const {getUser} = require("../functions/user")
const {register,login} = require("../functions/auth");
const { verifyToken } = require("../middlewares/verify_token");


router.post("/getUser",getUser);
router.post("/register",register);
router.post("/login",login);
router.get("/verify", verifyToken)





module.exports = router;