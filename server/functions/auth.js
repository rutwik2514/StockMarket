const express = require("express");
const userModel = require("../model/user_model");


const register = async (req,res) =>{
    //get data in format of schema;
    const profile = req.body;
    //create user in database
    userModel.create({userEmail : profile.userEmail, userName : profile.userName, userPortfolio : [{
        userBalance : profile.userPortfolio[0].userBalance,
        userSpent : profile.userPortfolio[0].userSpent,
        userProfit : profile.userPortfolio[0].userProfit,
        userStocks : profile.userPortfolio[0].userStocks

    }]})
    .then(()=>{
        return res.status(200).json({ msg: "Profile Created" });
    }).catch((err)=>{
        return res.status(400).json({msg:"Something went wrong, Please try again", error : err});
    })
}
module.exports={
    register
}
