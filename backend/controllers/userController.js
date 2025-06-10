const { message } = require('antd');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// const generateToken = require('../utils/generateToken');

// login user

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check if user exists

    try {
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "user does not exists",
                    success: false
                })
        }

        // check password

        if (!await (user.equalPassword(password))) {
            return res
                // .status(200)
                .send({ message: "Invalid Password", success: false });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.send({
            message: "User logged in successfully",
            success: true,
            data: token
            // ,user

        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }



    // if (user && (await user.equalPassword(password))) {
    //     res.json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         token: generateToken(user._id)
    //     })
    // }
    // else {
    //     res.status(400)
    //     throw new Error('Not Valid')
    // }


    // res.json({ email, password });
})

// signup user

const signupUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    try {
        if (userExists) {
            res
                .send({
                    message: "user Already exists",
                    success: false
                })
            // throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
        })

        if (user) {
            res.status(201)
                .send({
                    message: "User Registered Successfully",
                    success: true
                })
                .json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    // token: generateToken(user._id)
                });
        }
        else {
            res
                .send({
                    message: "Error Occured",
                    success: false
                })
            // throw new Error('Error Occured')
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }


    // res.json({ name, email });
})

// User Info

const userInfo = async (req, res) => {
    try {
        const data = await User.findById(req.body.id);
        res.send({
            message: "User info fetched Successfully",
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500)
        throw new Error("kaha bhai");
    }
}

module.exports = { loginUser, signupUser, userInfo };