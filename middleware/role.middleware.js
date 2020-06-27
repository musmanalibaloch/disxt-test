const jwt = require("jsonwebtoken")
const { FailureMessages } = require('../config/const.config')

const verifyToken = (req, res, next) => {
    try {
        if (req.body.user.role === 'admin')
            next()
        else
            res.send({ error: FailureMessages.UNAUTHORIZED_OPERATIONS }).status(403)
    } catch (err) {
        // err
        res.send({ error: FailureMessages.SOMETHING_WENT_WRONG }).status(500);
    }
}

module.exports = verifyToken; 