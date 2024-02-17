const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const {username, password, email} = req.body
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await User.create({username, password: hashPassword, email});
        return res.status(201).json({status: "successful", message: 'User created'})
    } catch (err) {
        res.status(500).json({ status: "failed", message: err.message });
    }
    console.log("signup")
}
const login = async (req, res) => {
    
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ status: "failed", message: "User not found!!" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(400).json({ status: "failed", message: "incorrect password!!" });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY
        )
        res.status(200).json({ message: "login successful",id: user._id, token });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "something went wrong.", error: err.message });
    }
}
const profile = async (req, res) => {
    
    try {
        const user = await User.findById(req.userId)
        res.status(200).json({ message: "success", details: user });
    } catch (err) {
      res
        .status(500)
        .json({ status: "failed", message: "something went wrong." });
    }
}

module.exports = {signup, login, profile}