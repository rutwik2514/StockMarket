const express = require("express");
const userModel = require("../model/user_model");



const getUser = async (req, res) => {
    try {
        const profile = await userModel.findOne({ userEmail: req.body.userEmail });
        if (profile == null) {
            return res.status(400).json({ msg: "USER NOT FOUND" });
        }
        return res.status(200).json({ data: { profile } });
    } catch (error) {
        return res.status(400).json({ msg: "SOMETHING WENT WRONG" });
    }
}
module.exports = {
    getUser
};