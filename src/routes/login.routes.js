const express = require('express');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { signup, getAllUsers, login } = require('../controllers/login.controller');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const LoginRouter = express.Router();

const verifyToken = async (req, res, next) => {
    const token = req.get("Authorization");

    if (token) {
        const payload = await jwt.verify(token.split(" ")[1], JWT_SECRET_KEY);

        if(payload){
            next();
        }else{
            return res.json({ Message: "User not allowed" })
        }
    } else {
        return res.json({ Message: "Invalid token" });
    }
}

LoginRouter.post("/admin/signup", signup);

LoginRouter.post("/admin/login", login);

LoginRouter.get("/admin", verifyToken, getAllUsers);


module.exports = LoginRouter;