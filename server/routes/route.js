const express = require("express");
const router = express.Router();
const {getUser} = require("../functions/user")
const {register} = require("../functions/auth")

router.post("/getUser",getUser);
router.post("/register",register);



module.exports = router;