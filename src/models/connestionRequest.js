const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect value types`
        }
    }
}, { timestamps: true })

//MongoDB jumps directly to matching documents  finds instantly using index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    //We write this to prevent a user from sending a connection request to themselves.
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("can not send connection request to yourself ")
    }
    next();
})



const connectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema)
module.exports = connectionRequestModel;