//Yahan uploading wala routes rakhenge
const express = require('express')

const router = express.Router();
//upload wala route import
const upload = require('../config/multer.config') 

//file schema model ko import
const fileModel = require('../models/files.models')

//Authentication wala middleware import krlo
const authMiddleware =  require('../middlewares/auth')

const firebase = require('../config/firebase.config')

router.get('/home', authMiddleware, async (req,res) => {
    //Jo bhi files user ne upload ki hogi woh issey show hoga 
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFiles);

    //Ab mast cheez jo bhi userFiles read kr raha backend se Usko mai render kr raha hoon /home pe files naam se
    //Access hoga home.ejs mein go check
    res.render('home', {
        files: userFiles
    })
})

//single(ye jo naam hai wahi hai jo /home.ejs mein form ke andar input mein name diye thei)
router.post('/upload', authMiddleware,  upload.single('file'), async (req,res) => {
    const newFile = await fileModel.create({
        //Ab kya kya chahiye iss collection mein write
        //file ka jo data hota hai woh aata hai 'req.file' mein
        path: req.file.path,
        originalname: req.file.originalname,
        //Ab yahan lagega authentication ki bhai file koi user hee uplaod krega 
        //Humara /home ko logged in user hee access kr payega uske liye we add custom middlewares

        //Ab suno jab user Login kr raha tha tab humne userId set krdi, aur ab woh jab upload kr raha tha toh humne uss token
        //ko decode krke userId nikaal li
        user: req.user.userId
    })
    res.json(newFile);
})


router.get('/download/:path', authMiddleware, async (req,res) => {
    //Jis user ne upload kiya hai wahi apni file access kr paaye uske liye we are doing this
    //issey logged in user ki id le liye ismein
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        //yahan pe query lagake dekh rahe jo user ne upload woh iss loggedInUser se match kar raha, and path also will be same
        user: loggedInUserId,
        path: path
    })

    if(!file){
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
    //By default firebase apne files ko access krne nhi deta toh uske liye ek signedUrl banana padta hai jo kuch der
    //ke liye available rehta hai, yahan hum 60 seconds ke liye kar rahe 
    //file(path) toh dena hee hai kyuki yahi unique hai
    const signedURL = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 1000
    })
    //signedUrl ek array return krta hai toh uska humein first parameter chahiye
    res.redirect(signedURL[ 0 ])
})

module.exports = router;

//Go to /home and inspect then inside application Go to cookies delete token Then it will say unauthorized 