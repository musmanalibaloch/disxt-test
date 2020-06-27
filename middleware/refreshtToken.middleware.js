const jwt = require("jsonwebtoken")
const { FailureMessages, successMessages } = require('../config/const.config')


const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['token'];
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.body.user = {};
        req.body.user.username = decoded.username;
        req.body.user.userId = decoded._id;

         // create token
         const newToken = jwt.sign({ username: decoded.username , role: decoded.role, userId: decoded._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
         // refresh token
         const refreshToken = jwt.sign({ username: decoded.username , role: decoded.role, userId: decoded._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: 60 * 61 })

         // response
         res.send({ token: newToken, refreshToken: refreshToken , message: successMessages.USER_LOGIN }).status(200)
        next();
    } catch (err) {
        // err
        res.send({ error: FailureMessages.UNAUTHENTICATED_USER }).status(401);
    }
}

module.exports = verifyToken; 