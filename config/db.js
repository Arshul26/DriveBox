//mongodb se connection banane ke liye 
const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to DB")
    })
}

module.exports = connectToDB;
//Ab isko require kr lenge user.routes.js mein