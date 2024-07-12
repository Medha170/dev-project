const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {
        const userExists = await User.findOne({email: req.body.email});

        if (userExists) {
            res.send({
                sucess : false,
                message : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "You've successfully signed up, please login now!",
        });
    }
    catch (err) {
        res.json(err);
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.send({
            success : false,
            message : "User does not exist, please register"
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        res.send({
            success : false,
            message : "Invalid password"
        })
    }

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.send({
        success : true,
        message : "User has been logged in successfully",
        token : token
    })
});


module.exports = router;