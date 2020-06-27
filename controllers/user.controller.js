const { productModel, userModel } = require('../models/index')
const { successMessages, FailureMessages } = require('../config/const.config')
var jwt = require('jsonwebtoken')
const userService = require('../service/user.service')

const signup = async (req, res) => {
    try {

        /*
        *
        *  Get user data
        *
        * 
        */

        const { username, password, name, lastname, age, role } = req.body;


        /*
         *
         *  check if user already exists, if user
         *
         *  already exists, throw error, otherwise
         *
         *  create user
         */

        const userExists = await userService.ifUserExists(username)
        if (userExists)

            /*
             *
             *  
             *  user already exists with provided username
             * 
             *  throw error
             *  
             */

            throw new Error(FailureMessages.USERNAME_ALREADY_EXISTS)



        else

            /*
             *
             *  
             *  create user and proceed to login
             *  
             *  
             */

            await userService.createUser(res, { username, password, name, lastname, age, role })



    } catch (error) {
      
        res.send({ error: error.message });
    }
}


const login = async (req, res) => {
    try {

        /*
        *
        *  Get user data
        *
        * 
        */

        const {
            username,
            password
        } = req.body;


        /*
        *
        *  proceed user login
        *
        * 
        */
        await userService.loginUser(res, username, password)



    } catch (error) {
        res.send({ error: error.message });
    }
}


const logout = async (req, res) => {
    try {
        /*
        *
        *
        * TODO: IMPLEMENT LOGOUT BY EXPIRING JWT
        * 
        * 
        */
        res.send({ message: 'USER LOGGED OUT' }).status(200);

    } catch (error) {

        // failure
        res.send({ error: error.message })
    }
}




module.exports = {
    signup,
    login,
    logout
}