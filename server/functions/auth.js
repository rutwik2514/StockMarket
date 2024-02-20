const express = require("express");
const userModel = require("../model/user_model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    //get data in format of schema;
    const profile = req.body;
    //create user in database
    const isPresent = await userModel.find({userEmail:profile.userEmail});
    // console.log("if prsent", isPresent,profile.userEmail);
    if(isPresent.length){
        return res.status(400).json({msg:"USER ALREADY FOUND"})
    }
    const password = profile.userPassword;
    let confirmPassword = profile.confirmPassword;
    if (password == undefined) {
        return res.status(400).json({ msg: "PASSWORD CANNOT BE EMPTY" })
    }
    if (password !== confirmPassword || confirmPassword== undefined) {
        return res.status(400).json({ msg: "PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating in database
    userModel.create({
        userEmail: profile.userEmail, userName: profile.userName, userPassword: hashedPassword, userPortfolio: [{
            userBalance: profile.userPortfolio[0].userBalance,
            userSpent: profile.userPortfolio[0].userSpent,
            userProfit: profile.userPortfolio[0].userProfit,
            userStocks: profile.userPortfolio[0].userStocks

        }]
    }).then(() => {
            return res.status(200).json({ msg: "Profile Created" });
        }).catch((err) => {
            return res.status(400).json({ msg: "Something went wrong, Please try again", error: err });
        })
}



const login = async (req, res) => {
    const { userEmail, userPassword,get } = req.body;
    const profile = await userModel.findOne({ userEmail: req.body.userEmail });
    if ((userPassword == undefined || userEmail == undefined)) {
        return res.status(400).json({ msg: "PLEASE ENTER EMPTY FIELDS" })
    }
    if (profile == null) {
        return res.status(400).json({ msg: "USER NOT FOUND" });
    }
    console.log(process.env.JWT_SECRET);
    console.log(process.env.REFRESH_TOKEN);
    const accessToken = jwt.sign({profile},process.env.JWT_SECRET,{
        expiresIn : "7d"
    });
    const refreshToken = jwt.sign({profile}, process.env.REFRESH_TOKEN,{
        expiresIn:"7d"
    })
    res.cookie("jwt", refreshToken, {
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    if (await bcrypt.compare(userPassword,profile.userPassword)){return res.json({ userEmail,accessToken })}
    else return res.status(400).json({ msg: "INCORRECT PASSWORD" });

}
module.exports = {
    register,
    login,
}
