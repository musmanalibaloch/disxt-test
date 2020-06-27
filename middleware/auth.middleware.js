const jwt = require("jsonwebtoken")
const { FailureMessages } = require('../config/const.config')
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['token'];
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = {};
        req.body.user.username = decoded.username;
        req.body.user.userId = decoded.userId;
        req.body.user.role = decoded.role;
        next();
    } catch (err) {
        // err
        res.send({ error: FailureMessages.UNAUTHENTICATED_USER }).status(401);
    }
}

module.exports = verifyToken; 