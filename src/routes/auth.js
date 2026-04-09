const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


authRouter.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, email, password: hashedPassword });

        await user.save();
        res.send("user signup successfully");


    } catch (error) {
        console.log("error" + error)
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            //token 
            let token = jwt.sign({ _id: user._id }, "charlie@dev2");


            // add the token to the cookie
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            })

            res.send(user)

        } else {
            res.send("invalid user")
        }

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ msg: 'server error' })
    }
})

authRouter.post("/logout", (req, res) => {

    res.clearCookie("token", null, { expires: new Date(Date.now()) });

    res.status(200).json({ messsage: "logout successfully" })
})
module.exports = authRouter