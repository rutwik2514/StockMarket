
import User from "../models/user_model.js";
import { validemail } from "../middleware/Validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Portfolio from "../models/portfolio_model.js";






import express from "express";
import Portfolio from "../models/portfolio_model.js";
import User from "../models/user_model.js";
import axios from "axios";

export const Buy = async (req, res) => {
  const { stockName, stockBuyingPrice, stockBuyQuantity } = req.body;
  const user = User.find(req.decoded_token);
  const userId = req.decoded_token.id;
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    const dateObj = new Date();
    const currentDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:00`;
    console.log(currentDate); // Outputs the current date in "YYYY-MM-DD HH:MM:00" format
      //asndaksjndaskjdasdioas
    //check if stock name already exsists
    const stock = portfolio_user.portfolio.find(
      (stock) => stock.stockName === stockName
    );

    //checking if have enough balance
    if (portfolio_user.balance - stockBuyQuantity * stockBuyingPrice >= 0)
      portfolio_user.balance -= stockBuyQuantity * stockBuyingPrice;
    else {
      return res.status(500).json({ message: "You do not have enough balance" });
    }

    //if stock is buyed first time, push everything
    if (stock == null) {
      portfolio_user.portfolio.push({
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
    }
    //if stock was buyed already, then just update that field
    else {
      stock.stockBuyingPrice.push({
        stockBuyPrice: stockBuyingPrice,
        stockBuyDate: currentDate,
      });
      stock.stockRemainigQuantity += Number(stockBuyQuantity);
      await portfolio_user.save();
    }
    return res.status(200).json({ message: "Portfolio created successfully", portfolio: portfolio_user });
  } catch (error) {
    return res.status(404).json({ message: "Portfolio not found for the given userId" });
  }


};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};

export const Sell = async (req, res) => {

  const { stockName, stockQuantity, token, stockPrice } = req.body;
  const userId = req.decoded_token.id;
  //getting to and from date

  //for now date is static for development purpose, afterwards please change it to current date
  let currentDate = `2024-06-14 14:30:00`;

  console.log(currentDate); // Outputs the current date in "YYYY-MM-DD HH:MM:00" format
      //asndaksjndaskjdasdioas
    //check if stock name already exsists
    const stock = portfolio_user.portfolio.find(
      (stock) => stock.stockName === stockName
    );

    //checking if have enough balance
    if (portfolio_user.balance - stockBuyQuantity * stockBuyingPrice >= 0)
      portfolio_user.balance -= stockBuyQuantity * stockBuyingPrice;
    else {
      return res.status(500).json({ message: "You do not have enough balance" });
    }

    //if stock is buyed first time, push everything
    if (stock == null) {
      portfolio_user.portfolio.push({
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
    }
  try {
    const portfolio = await Portfolio.findOne({ userId: userId });
    const stockRemainingQuantities = portfolio.filter(stock => stock.stockName === stockName).map(filteredStock => filteredStock.stockRemainigQuantity);
    if (stockQuantity > stockRemainingQuantities) {
      res.status(500).json({ message: "You do not have enough stocks to sell" });
      return;
    }
    const stock = portfolio.portfolio.find(
      (stock) => stock.stockName === stockName
    );
    stock.stockRemainigQuantity = stockRemainingQuantities - stockQuantity;
    portfolio.balance = portfolio.balance + stockPrice * stockQuantity;
    stock.stockSell.push({
      stockSellQuantity: stockRemainingQuantities - stockQuantity,
      stockSellPrice: stockPrice,
      stockSellDate: currentDate
    });
    try {
      await portfolio.save();
      res.status(200).json({ message: "Portfolio created Successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error Updating Portfolio" })
    }
    

    console.log(currentDate); // Outputs the current date in "YYYY-MM-DD HH:MM:00" format
      //asndaksjndaskjdasdioas
    //check if stock name already exsists
    const stock2 = portfolio_user.portfolio.find(
      (stock) => stock.stockName === stockName
    );

    //checking if have enough balance
    if (portfolio_user.balance - stockBuyQuantity * stockBuyingPrice >= 0)
      portfolio_user.balance -= stockBuyQuantity * stockBuyingPrice;
    else {
      return res.status(500).json({ message: "You do not have enough balance" });
    }

    //if stock is buyed first time, push everything
    if (stock == null) {
      portfolio_user.portfolio.push({
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
    }

  } catch (e) {
    console.log("Stock market is down at this moment");
    // return { stockInfo: e };
  }
};

export const showStocks = async (req, res) => {
  const user = User.find(req.decoded_token);
  const userId = req.decoded_token.id;
  if (!userId) {
    return;
  }
  try {
    const portfolio_user = await Portfolio.findOne({ userId: userId });
    console.log("user is ", portfolio_user);
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





export const signUp = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const profile = await User.findOne({ userName });
  if (profile) {
    return res.status(500).json({ message: "user already exists" });
  }

  //checking mail already exsists
  const checkForMail = await User.findOne({ email });
  if (checkForMail) {
    return res.status(500).json({ message: "mail is already registered" });
  }

  ///validations
  if (!validemail(email)) {
    return res.status(500).json({ message: "Invalid email:Please check again" });
   
  }
  if (confirmPassword != password) {
    res.status(500).json({ message: "Password and confirmPassword must be same" });
    return;
  }
  if (password.length < 6) {
    return res.status(500).json({ message: "Password should have minimum 6 characters" });
  }

  //saving in database
  const newPassword = password + process.env.PEPPER;
  const hashedPassword = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(newPassword, salt));
  const user = new User({ userName, email, password: hashedPassword });
  const portfolio = new Portfolio({ userId: user._id, balance: 1000, portfolio: [] });
  try {
    console.log("saving");
    await portfolio.save();
    user.portfolio = portfolio._id;
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName)
  const findUser = await User.findOne({ userName });
  if (!findUser) {
    res.status(500).json({ message: "User does not exist" });
    return;
  }

  const newPassword = password + process.env.PEPPER;
  const validatePassword = await bcrypt.compare(newPassword, findUser.password);
  if (!validatePassword) {
    res.status(401).json({ message: "Inavalid Password, Please try again" });
    return;
  }
  try {
    const id = findUser._id;
    const token = jwt.sign({ id }, process.env.JWTSECRET);
    // ValidateUser();
    // console.log(token);
    res.status(200).send({ message: "User logged in succesfuly", token });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const fetchUser = (req, res) => {
  res.status(200).json({ message: req.decoded_token });
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.decoded_token.id);
    res.status(200).json({ user: user });
  } catch (e) {
    res.status(500).json({ user: "No user found" });
  }


}
export const updateUsername = async (req, res) => {
  const { updateUserName } = req.body;
  try {
    const user = await User.findById(req.decoded_token.id);
    user.userName = updateUserName;
    await user.save();
    res.status(200).json({ message: "Updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "No user found" });
  }

}