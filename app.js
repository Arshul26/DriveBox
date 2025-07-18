const express = require('express')
const app = express()

const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')

//npm i dotenv for encryption of secret keys
const dotenv = require('dotenv');
dotenv.config();

//jo export kiye db.js se usko yahan import krenge
const connectToDB = require('./config/db')
connectToDB();

//npm i cookie-parser
//hum token ko save krte hai cookies ke andar 
const cookieParser = require('cookie-parser');

app.set("view engine", 'ejs')
//Yaad rakhna app.js ke andar jitne bhi middlewares use kroge unko call krna hota hai warna response nhi bhej pata hai server
app.use(cookieParser());
//yeh inbuilt middleware for storing data in req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//woh user ke routes ko use krenge issey /user/wahan jo bhi route ho like 'register' = /user/register
app.use('/user', userRouter);
//iss baar direct localhost://3000/home krne se routing ho jayega
app.use('/', indexRouter);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})