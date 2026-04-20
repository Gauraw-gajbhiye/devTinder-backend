const validator = require('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    if (!firstName || !lastName) {
        throw new Error('name should be mention')
    }
    else if (!validator.isEmail(emailId)) {

        throw new Error("Email is not valid!")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong password")
    }
}
const validateEditProfiledata = (req) => {
    const allowedFields = ["firstName", "lastName", "photoUrl", "age", "about", "gender"]
    const isEditAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field))
    return isEditAllowed
}
module.exports = { validateSignUpData, validateEditProfiledata }