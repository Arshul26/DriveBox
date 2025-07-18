//Yahan users ka schema banega kya properties hogi users ki
const mongoose =  require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [3, 'Username must be atleast 3 characters long']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [13, 'Email must be atleast 5 characters long']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, 'Password must be atleast 5 characters long']
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;