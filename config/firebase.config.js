//npm i firebase-admin for connecting your express server with firebase
const Firebase = require('firebase-admin')

const serviceAccount = require('../drivebox-98b59-firebase-adminsdk-fbsvc-ae2cf9994b.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drivebox-98b59.firebasestorage.app'
})

module.exports = Firebase;
