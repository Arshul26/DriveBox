const express = require('express')

//We made this for separating routes for different things like user ke routes or uplaoding ke routes so that app.js dont get messy
const router = express.Router()

//npm install express-validator
//for checking if data is valid or not like passowrd should be of minimum 5 characters
const { body, validationResult } = require('express-validator');

//schema ko require userModel ke andar
const userModel = require('../models/user.model')

//npm i bcrypt
//Password hum direct nhi daalte plain text mein compromise ho skta hai database se
const bcrypt = require('bcrypt')

//npm i jsonwebtoken
//Dekho user login sirf ek baar krta hai uske baad usko saare authorisation mil jate hai ki jo karna hai karo you are logged in
//Ye humein pata chalta hai token ke through jo JWT generate krta hai
const jwt = require('jsonwebtoken');

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register',
    //middleware for validation data
    body('email').trim().isEmail(),
    body('password').trim().isLength({min: 5}),
    body('username').trim().isLength({min: 3}),
    //async kyuki pehle wait krenge data server pe aayega then user create hoga
    async (req,res) => {
        //ab actual mein data sahi hai ya nahi woh iss 'errors' ke andar aa jayenge
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        //Ab agar koi error nhi aa rahi toh email,usr,pass nikaal lena body se aur inn variables mein daal dena
        const {email, username, password} = req.body

        const hashPassword = await bcrypt.hash(password, 10)//10 means 10 times hashing rounds more protected

        //Ab jo bhi user create hoga woh newUser variable ke andar mil jayega aur json ke form mein send krdenge
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword
        })
        res.json(newUser)
        
        // console.log(errors)
        // console.log(req.body)
        //res.send("User registered")
})

router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/login', 
    body('password').trim().isLength({min: 5}),
    body('username').trim().isLength({min: 3}),
    async (req,res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const {username, password} = req.body
        //Hum user ko find kar rahe hai on the basis of username jo usne req.body mein diya hoga
        const user = await userModel.findOne({
            username: username
        })
        
        if(!user){
            return res.status(400).json({
                message: "Username or password is incorrect"
            })
        }
        //idhar hum password compare krte hai login krne time
        //1st password jo user se aaya req.body mein usko 2nd user ke hashed password se
        //boolean form mein isMatch mein aa jayega true or false
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: "Username or password is incorrect"
            })
        }

        //Token se pata chalta hai ki user logged in hai ya nahi
        //1st parameter is an object that contains user information 2nd secret key 
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
        )
        //1st name 2nd value
        //benefit of cookies: Ab browser kuch bhi request krta hai server pe toh ye cookie har request ke saath jata hai
        res.cookie('token', token);
        res.send("logged in")
})

module.exports = router;

// Because the secret isn't tied to who the user is. It's tied to the server.
// Every token contains user-specific info (like userId, email, etc.).

// The key is only used to:
// Prevent tampering(koi interfere na kare) of the token.
// Allow the server to verify authenticity.

// 🧠 Analogy:
// Think of JWT like a passport:
// The server is the passport office.
// The token is the passport.
// The secret key is the stamp/seal.

// Every passport has different person info, but the same official seal is used to prove it's real. 
// The same way, every token has different user data, but it’s signed using one server secret.