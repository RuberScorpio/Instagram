const express = require("express");
const bcrypt = require("bcrypt");
const Validation = require("../helpers/Validation");
const router = express.Router()
const { users } = require("../models")
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/Authentication");
require("dotenv").config()

router.post("/", async (req, res) => {

    const {email, username, password} = req.body;

    if(email && !Validation.isValidEmail(email)){
        return res.json({ error: "Invalid Email"});
    };

    if(username && !Validation.isValidUsername(username)){
        return res.json({ error: "Invalid Username"});
    };

    if(!Validation.isValidPassword(password)){
        return res.json({ error: "Invalid Password"});
    };

    try {

        bcrypt.hash(password, 10).then(async (hash) => {
            try {
                await users.create({
                    email: email,
                    username: username,
                    password: hash
                });
                return res.json({ message: "User has been CREATED" });
            } catch(e) {
                return res.json({ error: e })
            }
        })

    } catch(e) {
        return res.json({ error: e })
    }
})

router.post("/login", async (req, res) => {

    const {email, username, password} = req.body;

    
    if((!email && !username) || !password){
        return res.json({ error: "Invalid Input"});
    };
    
    if(email && !Validation.isValidEmail(email)){
        return res.json({ error: "Invalid Email"});
    };

    if(username && !Validation.isValidUsername(username)){
        return res.json({ error: "Invalid Username"});
    };
    
    let user;
    if(username) {
        user = await users.findOne({ where: { username: username}})
    } else if(email) {
        user = await users.findOne({ where: { email: email}})
    }
    
    if(!user) {
        return res.json({ error: "Account does not exist"})
    }
    
    // match password
    
    bcrypt.compare(password, user.password).then( async (match) => {
        if(!match) {
            return res.json({ error: "Wrong password"})
        }
        const authToken = sign(
            {
                email: user.email,
                username: user.username,
                status: true,
            },
            process.env.AUTH_SECRET)

        return res.json({
            authToken: authToken,
            email: user.email,
            username: user.username,
            status: true
        });
    })
})

router.get("/auth", validateToken, async (req, res) => {

    if(req.user) {
        return res.json({ user: req.user});
    }
})

module.exports = router;