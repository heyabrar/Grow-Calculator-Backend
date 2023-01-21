const { Router } = require('express');
const UserRouter = Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { UserModel } = require('../Models/User.model');

UserRouter.post('/register', async (req, res) => {
    const {name,email, password } = req.body;
    const UserAlreadyExist = UserModel.findOne({ email });
    if (UserAlreadyExist?.email) res.status(400).send({ "message": "User Already Exist, Try Another Email" });
    else {
        try {
            bcrypt.hash(password, 3, async (err, hash) => {
                const UserRegister = new UserModel({ name, email, password: hash });
                await UserRegister.save();
                res.send({ "message": "Registration Successfull" });
            })
        } catch (error) {
            res.status(400).send({ "message": "Something Went Wrong!!" });
        };
    };
});


UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const UserLogin = await UserModel.find({ email });
    try {
        if (UserLogin.length > 0) {
            const SecurePassword = UserLogin[0].password;
            bcrypt.compare(password, SecurePassword, function (err, result) {
                if (result) {
                    const token = JWT.sign({ 'userID': UserLogin[0]._id }, process.env.JWT_KEY);
                    res.send({ "message": "Account Created, LogIn Successfull" , "token" : token});
                }
                else {
                    res.status(400).send({ "message": "User With Email Not Found, Try Again" })
                }
            })
        }
        else {
            res.status(400).send({ "message": "User With Email Not Found, Try Again" })
        }
    } catch (error) {
        res.status(400).send({ "message": "Something Went Wrong!!" });
    }
})

module.exports = {
    UserRouter
};