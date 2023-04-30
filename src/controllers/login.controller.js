const Login = require("../models/login.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateSalt, hashPassword, decodePassword } = require("../services/password");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res) => {
    try {
        const users = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
        }

        const salt = generateSalt();
        users.password = hashPassword(req.body.password, salt);

        const user = await Login.create(users);

        res.json({ message: user });
    }
    catch (err) {
        console.log(err);
        res.json({ message: "internal error occures" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Login.find();
        res.json({ message: users });
    }
    catch (err) {
        res.json({ message: "internal error occured" });
    }
};

const login = async (req, res) => {
    const checkUser = await Login.findOne({ email: req.body.email });
    if (checkUser) {
        const checkPassword = decodePassword(req.body.password, checkUser.password);

        if (checkPassword) {

            const email = checkUser.email;

            const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "5d" });

            return res.json({
                message: "You are logged in",
                Token: token,
            });
        } else {
            return res.json({ message: "Password is wrong" });
        }

    } else {
        return res.json({ message: "user/email not found" });
    }
};

module.exports = {
    signup,
    getAllUsers,
    login,
}