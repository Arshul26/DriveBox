//npm i multer multer-firebase-storage = multer frontend se samaan leke aata hai aur multer-firebase-storage firebase tak pohonchayega
const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage')
const firebase = require('./firebase.config')
const serviceAccount = require('../drivebox-98b59-firebase-adminsdk-fbsvc-ae2cf9994b.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drivebox-98b59.firebasestorage.app',
    unique: true,//issey yeh hoga ki same name se wahi file upload kroge toh ho jayega, Aur uska path toh alag hoga hee in firebase
})

const upload = multer({
    storage: storage,
})

module.exports = upload;