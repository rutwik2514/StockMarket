const mongoose = require("mongoose")

const user_schema = new mongoose.Schema({
    userEmail : {
        type: String,
        trim : true,
        required:[true, "Must provide user email"],
        unique : [true, "This email is already registered"]
    },
    userName:{
        type:String,
        trim : true,
        required : [true, "Must provide Name"]
    },
    userPassword:{
        type : String,
        required : [true, "Must provide Password"]
    },
    userPortfolio: [{
        userBalance:{
            type:Number,
        },
        userSpent:{
            type:Number,
        },
        userProfit:{
            type:Number,
        },
        userStocks : [{
            stockName:{
                type:String,
            },
            stockPurchasePrice : {
                type: String,
            },
            stockPurchaseDate:{
                type:String,
            },
            stockPurchaseTime : {
                type:String,
            }
        }]

    }]
})

module.exports = mongoose.model("User",  user_schema);