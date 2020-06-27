/*
*
* User related helper/service methods
*
*
*/


const { userModel } = require('../models')
const { successMessages, FailureMessages } = require('../config/const.config')
const jwt = require('jsonwebtoken')

const loginUser = async (res, username, password) => {
    try {



        /*
         *
         *  check if user  exists, if user
         *
         *  exists proceed with login
         *
         * 
         */

        const userExists = await userModel
            .findOne({ username })

        if (userExists) {
            /*
             *
             *  
             *  validate password
             *  
             *  
             */

            await userExists.comparePassword(password, (error, match) => {

                // check if password matched
                if (!match) {
                    return res.status(400).send({ message: FailureMessages.PASSWORD_NOT_MATCHED })
                }

                // create token
                const token = jwt.sign({ username: username, role: userExists.role, userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                
                // create referesh token
                const refreshToken = jwt.sign({ username: username, role: userExists.role, userId: userExists._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: 60 * 62 })
            
                // response
                res.send({ token: token, refreshToken: refreshToken , message: successMessages.USER_LOGIN }).status(200)
            });

        } else {

            throw new Error(FailureMessages.INVALID_CREDENTIALS)

        }
    } catch (error) {
     
        throw new Error({ error: error.message })

    }
}

const ifUserExists = async (username) => {
    try {

        /*
        *
        *  check if user  exists
        *
        * 
        */

        const userExists = await userModel
            .findOne({ username })
            .lean();

        if (userExists)
            return true
        else
            return false

    } catch (error) {
        throw new Error({ error: error.message })
    }
}

const createUser = async (res, userData) => {
    try {

        const user = await userModel.create({
           ...userData
        });


        if (user) {
            res.send({ message: successMessages.USER_SIGNED_UP })
        }
        else {
            throw new Error(FailureMessages.SIGNUP_FAILED)
        }

    } catch (error) {
     
        throw new Error({ error: error.message })
    }
}

module.exports = {
    loginUser,
    ifUserExists,
    createUser
}