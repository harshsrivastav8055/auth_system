
const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    })
}
// export default databaseConnection;
module.exports = connectDB;
