const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connestionRequest");
const user = require("../models/user");
const requestRouter = express.Router();

//:dynamic status 
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "invalid status type: " + status })
        }

        const toUser = await user.findById(toUserId);

        if (!toUser) {
            return res.status(404).json({ message: 'user not found' })
        }


        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send({ message: "connection request already exist" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId, status
        })
        const data = await connectionRequest.save()
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        })


    } catch (error) {
        res.status(400).send("Error:" + error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "status not allowed" })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            return res.status(404).json("connection request not found")
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.json({ message: "connection request " + status, data })


    } catch (error) {
        res.status(404).send("error:" + error.message)
    }
})

module.exports = requestRouter
