const jwt = require('jsonwebtoken')

//Authentication wala poora kaam based hoga token pe
function auth(req,res,next){
    //humara token saved hai cookies mein
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try{
        // This key is used in two places:
        //     When creating the token (jwt.sign(...)) — to secure it.
        //     When verifying the token (jwt.verify(...)) — to validate it.
        //Jab login hua tha toh .sign se token generate kiye thei, toh jab bhi user koi request krega server se toh woh har baar cookies
        //mein aata hai, Isliye hum upar dekho const token mein cookies se le rahe, Agar nhi hoga cookies ke andar then Unauthorized
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Agar sab sahi hai toh User create krne time check .sign() wali user object jo thi woh 'decoded' ke andar aa jayegi
        req.user = decoded;
        return next();

    }catch(err){
        //Koi tamper kr diya hoga token ko aka Hackers toh we send error
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

}

module.exports = auth;