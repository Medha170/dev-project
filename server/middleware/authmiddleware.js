const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = verified.userId;
        next();
    }
    catch(error){
        console.log(console)
    }
}