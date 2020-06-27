/*
*
*   Load all models
*
*/

const userModel = require('./user.model');
const productModel = require('./product.model')

/*
*
* Models factory
*
*/

module.exports={
    userModel,
    productModel
}