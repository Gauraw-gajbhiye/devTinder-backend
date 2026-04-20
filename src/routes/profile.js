
const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/auth")
const { validateEditProfiledata } = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (error) {
        console.log("error" + error)
        res.status(400).send("ERROR" + error.message)
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        if (!validateEditProfiledata(req)) {
            throw new Error("invalid Edit request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        // console.log(loggedInUser);
        await loggedInUser.save()

        res.json({ message: `${loggedInUser.firstName}, your profile edit successfully`, data: loggedInUser })
    } catch (error) {
        res.status(400).send("ERROR :" + error.message)
    }
})

profileRouter.patch("profile/password", (req, res) => {

})

module.exports = profileRouter