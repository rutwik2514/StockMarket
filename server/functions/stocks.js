const express = require("express");
const userModel = require("../model/user_model");

const buyStock = async (req, res) => {
    const { stockName, stockPrice, stockQuantity, email } = req.body;
    const profile = await userModel.findOne({ userEmail: email })
    if (profile == null || typeof (profile) == undefined) {
        return res.status(400).json({ msg: "INVALID LOGIN" })
    }
    if (profile.userPortfolio[0].userBalance < stockPrice * stockQuantity) {
        return res.status(400).json({ msg: "SORRY, NOT ENOUGH FUNDS" })
    }
    if(stockQuantity==0 || stockQuantity==  null){
        return res.status(400).json({ msg: "PLEASE ENTER QUANTITY" })

    }

    let date = new Date();
    date = date.toLocaleDateString();
    let stock = {
        stockName: stockName,
        stockQuantity: stockQuantity,
        stockTotalValue: stockPrice * stockQuantity,
        stockPurchaseDate : date,
        stockPurchaseValue : stockPrice,
        stockId : profile.userPortfolio[0].userStocks.length + 1
    }
    profile.userPortfolio[0].userStocks.push(stock)
    profile["userPortfolio"][0]["userBalance"] = Number(profile.userPortfolio[0].userBalance - stockPrice * stockQuantity);
    profile["userPortfolio"][0]["userSpent"] = profile["userPortfolio"][0]["userSpent"] + stockPrice * stockQuantity
    await profile.save();
    return res.status(200).json({ msg: "Stock buyed successfuly" })

}

const sellStock = async (req, res) => {
    const {stockQuantity, email,id, stockPrice } = req.body;
    const profile = await userModel.findOne({ userEmail: email });
    if (typeof (profile) == undefined || profile == null) {
        return res.status(400).json({ msg: "INVALID LOGIN" })
    }

    const presentStocks = profile.userPortfolio[0].userStocks;
    const newPresentStock = [];
    var done = false;
    var price;
    presentStocks.map((element,index)=>{
        if(element.stockId == id){
            if(stockQuantity > element.stockQuantity){
                return res.status(400).json({msg:"Please enter valid quantity"})
            }
            done=true;
            element.stockQuantity = element.stockQuantity-stockQuantity;
            price = element.stockPurchaseValue;
        }
        if(element.stockQuantity != 0){
            newPresentStock.push(element);
        }
    })
    if(done){
        profile.userPortfolio[0].userBalance += stockPrice*stockQuantity;
        if(price > stockPrice){
            profile.userPortfolio[0].userLoss += (price-stockPrice)*stockQuantity
        }
        else{
            profile.userPortfolio[0].userProfit += (stockPrice-price)*stockQuantity
        }
        profile.userPortfolio[0].userStocks = newPresentStock;
        await profile.save();
        return res.status(200).json({ msg: "Stock sold successfuly" })
    }
}

module.exports = {
    buyStock,
    sellStock
}