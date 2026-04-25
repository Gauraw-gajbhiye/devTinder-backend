const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

module.exports = connectDB








// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(
//             "mongodb+srv://grvgajbhiye_db_user:vDrkHU53SvhLZl7n@devtindercluster.xlhh8cj.mongodb.net/devTinder?retryWrites=true&w=majority&appName=devTinderCluster",
//         );
//         console.log("DB is connected");
//     } catch (error) {
//         console.log("DB cannot be connected" + error.message);

//     }
// };

// module.exports = connectDB;
