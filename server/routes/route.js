const express = require("express");
const router = express.Router();
const {getUser} = require("../functions/user")
const {register,login} = require("../functions/auth");
const { verifyToken } = require("../middlewares/verify_token");
const { buyStock, sellStock } = require("../functions/stocks");


router.post("/getUser",getUser);
router.post("/register",register);
router.post("/login",login);
router.get("/verify", verifyToken)
router.post("/buystock",buyStock);
router.post("/sellstock",sellStock);


module.exports = router;