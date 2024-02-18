const express = require("express");
const userModel = require("../model/user_model");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    //get data in format of schema;
    const profile = req.body;
    //create user in database
    const password = profile.userPassword;
    let confirmPassword = profile.confirmPassword;
    if (password == undefined) {
        return res.status(400).json({ msg: "PASSWORD CANNOT BE EMPTY" })
    }
    if (password !== confirmPassword || password == undefined) {
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
        console.log("came",req.body);
        return res.status(400).json({ msg: "PLEASE ENTER EMPTY FIELDS" })
    }
    if (profile == null) {
        return res.status(400).json({ msg: "USER NOT FOUND" });
    }
    if (await bcrypt.compare(userPassword,profile.userPassword)){ return res.status(200).json({ userEmail })}
    else return res.status(400).json({ msg: "INCORRECT PASSWORD" });

}
module.exports = {
    register,
    login
}
