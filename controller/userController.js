const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async(req, res) => {
    const isEmailExist = await User.findOne({email: req.body.email});
    console.log(isEmailExist);
    if(isEmailExist) {
        res.status(406);
        throw new Error("Email already exists");
    }
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await User.create({
        username,
        email,
        password: hashedPassword
    });
    res.json(registeredUser);
});

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    if(user && await(bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '7d' }
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Unauthorized");
    }
});

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}