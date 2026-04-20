const mongoose = require('mongoose');

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    age: { type: Number },
    about: {
        type: String,
        default: "this is default about the user!"
    },
    skills: { type: [String] },
    photoUrl: {
        type: String,
        default: "https://history.ucr.edu/sites/default/files/styles/form_preview/public/Blank%20Profile%20Picture.png?itok=tOY7DAmt"

    }, gender: {
        type: String,
        enum: { values: ["male", "female", "other"], message: `{VALUE} is not a valid gender type` }
    }

}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "charlie@dev2", { expiresIn: "7d" });
    return token
};

module.exports = mongoose.model("User", userSchema)