//Hum files ke liye ek alag schema banate hai
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Path is required'],
    },

    originalname: {
        type: String,
        required: [true, 'Originalname is required']
    },

    user: {
        //iska matlab iss field ke andar kisi user ki Id aayegi
        type: mongoose.Schema.Types.ObjectId,
        //refernce mein batana hota hai ki yeh Id kis collection ko belong krti hai(Check in mongodb)
        ref: 'users',
        required: [true, 'User is required']
    }
})

const file = mongoose.model('file', fileSchema);
module.exports = file;