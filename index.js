const express = require('express');
const connectDB = require('./src/config/db')
const cors = require("cors")

const jwt = require("jsonwebtoken")
// const validateSignUpData = require('./src/utils/validation')
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const requestRouter = require("./src/routes/request")
const userRouter = require('./src/routes/user');


const cookieParser = require("cookie-parser");
const User = require('./src/models/user');


const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json());
app.use(cookieParser());



app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

connectDB().then(() => {
    console.log('DB connected')

    app.listen(4001, (req, res) => {
        console.log(`Running on port 4001`)
    })

}).catch((err) => {
    console.log(err)
});
