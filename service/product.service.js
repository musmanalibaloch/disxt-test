/*
*
* Product related helper/service methods
*
*
*/



const { productModel } = require('../models')
const { successMessages, FailureMessages } = require('../config/const.config')

const createProduct = async (res, name, price, description, created_by) => {
    try {

        /*
        *
        * Create new product
        *
        * 
        */

        await productModel.create({ name, price, description, created_by })

        // response
        res.send({ message: successMessages.PRODUCT_CREATED })

    } catch (error) {

        throw new Error(error.message)
    }
}

const getAllProducts = async (res, role = 'admin', page = 1) => {
    try {

        /*
         *
         *  GET PRODUCTS BY PAGE NUMBER
         *
         * 
         */


        // total number of records to fetch
        const fetchRecords = 10


        // total number of records to skip intially
        const skipRecords = page === 1 ? 0 : page * fetchRecords



        // fetch fields
        const fieldsToFetch = (role === 'admin') ? {} : { created_by: 0 }


        // fetch products
        const products = await productModel
            .find({}, fieldsToFetch)
            .skip(skipRecords)
            .limit(fetchRecords)
            .lean()

        res.send({ data: products }).status(200)

    } catch (error) {
    
        throw new Error({ error: FailureMessages.FAILED_TO_FETCH_PRODUCTS })
    }
}
const getOneProduct = async (res, role = 'admin', productId) => {
    try {

        /*
         *
         *  GET PRODUCT BY ID
         *
         * 
         */


        // fetch fields
        const fieldsToFetch = (role === 'admin') ? {} : { created_by: 0 }


        // fetch product
        const product = await productModel
            .findOne({ _id: productId }, fieldsToFetch)
            

        res.send({ data: product }).status(200)

    } catch (error) {
    
        throw new Error({ error: FailureMessages.FAILED_TO_FETCH_PRODUCTS })
    }
}


const updateProduct = async (res, _id, updateFields) => {
    try {
        /*
         *
         *  Update product by id
         *
         * 
         */

        const updated = await productModel.update({ _id: _id }, { $set: { ...updateFields } })


        /*
        *
        *  check if product updated
        *
        * 
        */

        if (updated.nModified > 0)


            res.send({ 'message': 'product updated successfully' }).status(200)


        /*
         *
         *  respond with 404 if product not found
         *
         * 
         */
        else

            res.send({ 'message': " Failed to updated product please check id" }).status(404)



    } catch (error) {

        throw new Error({ error: error.message })
    }
}


const deleteProduct = async (res, _id) => {
    try {
        /*
         *
         *  delete product by id
         *
         * 
         */
        const deleted = await productModel.update({ _id: _id })


        /*
         *
         *  check if product deleted
         *
         * 
         */

        if (deleted.n > 0)


            res.send({ 'message': 'product deleted successfully' }).status(200)


        /*
         *
         *  respond with 404 if product not found
         *
         * 
         */
        else

            res.send({ 'message': " Failed to delete product please check id" }).status(404)

    } catch (error) {

        throw new Error({ error: error.message })

    }
}
module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}