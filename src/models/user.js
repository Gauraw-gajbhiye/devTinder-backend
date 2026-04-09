const mongoose = require('mongoose');

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

    }, gender: { type: String, enum: { values: ["male", "female", "other"] } }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)