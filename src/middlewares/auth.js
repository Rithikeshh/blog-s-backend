const jwt = require('jsonwebtoken')
const checkUserLogin = (req, res, next) => {
    
    try {
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({statue: "failed", message: 'please provide authorization'});
        }
        const token = authorization.split(' ')[1];
        const info = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = info.id;
        next();
    } catch (error) {
        return res.status(401).json({statue: "failed", message: error.message});
    }

      
}
module.exports = {checkUserLogin}