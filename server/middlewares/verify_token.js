const userModel = require("../model/user_model");
const verifyToken = async (req, res, next) => {
    let tempmail = "permanent@gmail.com"
    let isPresent = null;
    isPresent = await userModel.findOne({ userEmail: tempmail });
    if (isPresent != null) {
        let stockAmount = 300;
        let stockName = "AAPL"
        let stockQuantity = 2;
        let currentAmount = Number(isPresent.userPortfolio[0].userBalance);
        let investedAmount = stockAmount * stockQuantity;
        var dateTime = new Date();
        console.log("date is", dateTime);
        console.log(isPresent.userPortfolio[0]);
        let newStock = {
            "stockName": stockName,
            "stockPurchasePrice": stockAmount,
            "stockQuantity": stockQuantity,
            "stockTotalValue" : investedAmount,
        }
        isPresent.userPortfolio[0].userStocks.push(newStock)
        isPresent["userPortfolio"][0]["userBalance"] = Number(currentAmount - investedAmount);
        await isPresent.save();
        return res.status(200).json(("hi"));
    }
}

module.exports = { verifyToken };