import express from "express";
import Portfolio from "../models/portfolio_model.js";
import User from "../models/user_model.js";
import axios from "axios";

export const Buy = async (req, res) => {
  const { stockName, stockBuyingPrice, stockBuyQuantity } = req.body;
  const user = User.find(req.decoded_token);
  console.log(req.decoded_token);
  const userId = req.decoded_token.id;
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    // console.log(portfolio_user);
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;
    console.log("current date is", currentDate);
    const stock = portfolio_user.portfolio.find(
      (stock) => stock.stockName === stockName
    );
    if (portfolio_user.balance - stockBuyQuantity * stockBuyingPrice >= 0)
      portfolio_user.balance -= stockBuyQuantity * stockBuyingPrice;
    else {
      return res.status(500).json({ message: "You donot have enough balance" });
    }

    if (stock == null) {
      console.log("i am here");
      portfolio_user.portfolio.push({
        stockName: stockName,
        stockBuyingPrice: [
          {
            stockBuyQuantity: stockBuyQuantity,
            stockBuyPrice: stockBuyingPrice,
            stockBuyDate: currentDate,
          },
        ],
        stockSell: [],
        stockRemainigQuantity: stockBuyQuantity,
      });

      await portfolio_user.save();
    } else {
      console.log("hi inside else");
      stock.stockBuyingPrice.push({
        stockBuyQuantity: stockBuyQuantity,
        stockBuyPrice: stockBuyingPrice,
        stockBuyDate: currentDate,
      });

      stock.stockRemainigQuantity += Number(stockBuyQuantity);
      await portfolio_user.save();
    }
    return res
      .status(200)
      .json({
        message: "Portfolio created successfully",
        portfolio: portfolio_user,
      });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Portfolio not found for the given userId" });
  }


};
export const findPortfolio = async (req, res) => {
  const { portfolio } = req.body;
  const user = User.find(req.decoded_token);
  console.log(req.decoded_token);
  const userId = req.decoded_token.id;
  // console.log(portfolio_user.stockName);}
  // const newPortfolio= new Portfolio({userId,portfolio})
  try {
    const portfolio_user = Portfolio.findById({ userId });
    console.log(portfolio_user.stockName);
    res.status(201).json({ message: "Portfolio created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Sell = async(req,res) => {
  const {stockName,stockQuantity,token1}=req.body;
  const stock_name = stockName;
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 1);
  console.log("sell")
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  let hours = dateObj.getHours().toString().padStart(2, "0");
  let minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const dateObj2 = new Date();
  dateObj2.setDate(dateObj2.getDate() - 2);
  const year2 = dateObj2.getFullYear();
  const month2 = (dateObj2.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day2 = dateObj2.getDate().toString().padStart(2, "0");

  const formattedDate2 = `${year2}-${month2}-${day2}`;

  let currentDate = `2024-06-14 14:30:00`;
  
  console.log("sell",currentDate)
  console.log(formattedDate2);
  console.log(formattedDate);
  console.log(stockName);


  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/historical-chart/1min/${stock_name}?from=${formattedDate2}&to=${formattedDate}&apikey=ucpqV91anbJoHZCiFMI7R3aQIB1kCJpj`
    );
    // console.log(response.data);
    const realTimeData = response.data.filter(
      (item) => item.date == currentDate
    );
    console.log("hiiii");
    // console.log("response is",realTimeData);
    // console.log(realTimeData[0].low);
    
    console.log("token is ",token1);
    const response2 = await axios.post(  "http://localhost:3001/api/stock/getstocks",
      {},
      { headers: { authorization: token1 ? `${token1}` : " " } }
    );
    const portfolio = response2.data.portfolio_user.portfolio;

    // Filter and map to get the stockRemainigQuantity for the specified stockName
    const stockRemainingQuantities = portfolio
    .filter(stock => stock.stockName === stockName)
    .map(filteredStock => filteredStock.stockRemainigQuantity);
    
    const userId = req.decoded_token.id;
      console.log("userid is",userId);
      console.log("balacne is" ,response2.data.portfolio_user.balance);
    // Log the result
    // console.log(stockRemainingQuantities);
    if(stockQuantity>stockRemainingQuantities)
      {
        res.status(500).json({message:"You do not have enough stocks to sell"});
        return;
      }
      console.log(stockQuantity);
      const totalFinalBalance=response2.data.portfolio_user.balance+realTimeData[0].low*stockQuantity;
      const totalRemainingStocks=stockRemainingQuantities-stockQuantity;
      const portfolio_user = await Portfolio.findOne({ userId: userId });
      const stock = portfolio_user.portfolio.find(
        (stock) => stock.stockName === stockName
      );
      console.log("i am there");
      console.log("stockrem",stockRemainingQuantities);
      console.log("stockquqnatit",stockQuantity);
      stock.stockRemainigQuantity=totalRemainingStocks;
      portfolio_user.balance=totalFinalBalance;
      console.log("ended reacged");
      console.log("stockrem",stockRemainingQuantities);
      stock.stockSell.push({
        stockSellQuantity: stockQuantity,
        stockSellPrice: realTimeData[0].low,
        stockSellDate: currentDate 
    });

    try {
   
      await portfolio_user.save();
      res.status(200).json({message:"Portfolio created Successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error Updating Portfolio"})
  }
    
  } catch (e) {
    // console.log("Stock market is down at this moment");
    // return { stockInfo: e };
  }
};

export const showStocks = async (req, res) => {
  const user = User.find(req.decoded_token);
  // console.log(req.decoded_token);
  const userId = req.decoded_token.id;
  // console.log(userId);
  if (!userId) {
    return;
  }
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    console.log("user is ",portfolio_user);
    res
      .status(200)
      .json({
        message: "data fetched succesfully",
        portfolio_user: portfolio_user,
      });
  } catch (e) {
    res.status(500).json({ message: "error occured" });
  }
};
