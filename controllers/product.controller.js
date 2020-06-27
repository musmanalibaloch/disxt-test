const { productModel } = require('../models')
const productService = require('../service/product.service')


const create = async (req, res) => {
    try {

        // product detail
        const {
            name,
            price,
            description } = req.body

        /*
        *
        *  
        *  if user is admin allow to create new 
        *  
        *
        */


        await productService.createProduct(res, name, price, description, req.body.user.userId)

    
    } catch (error) {

        // error
        res.send({ error: "product failed to added to inventory" })

    }
}

const getProducts = async (req, res) => {
    try {

        /*
        *
        *  
        *  fetch products in paginated manner, 20 at a times
        *  
        *
        */
       
        const page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1


        /*
        *
        *  
        *  fetch products keeping in perspective the admin and client
        *  
        *
        */


        await productService.getAllProducts(res, req.body.user.role, page)

    } catch (error) {
      
        res.send({ error: error })
    }
}


const getOneProduct = async (req, res) => {
    try {

        /*
        *
        *  
        *  fetch product by id
        *  
        *
        */

        const productId = req.params.id


        /*
        *
        *  
        *  fetch product keeping in perspective the admin and client
        *  
        *
        */


        await productService.getOneProduct(res, req.body.user.role, productId)

    } catch (error) {

        // response with error
        res.send({ error: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {

        /*
        *
        * id of product to be updated
        *
        *
        */


        const { id } = req.params


        /*
        *
        * Update specific fields of product
        *
        *
        */

        const updateFields = req.body


        await productService.updateProduct(res, id, updateFields)

    } catch (error) {

        // response with error
        res.send({ error: error.message })

    }
}

const deleteProduct = async (req, res) => {
    try {

        /*
        *
        * id of product to be deleted
        *
        *
        */


        const { id } = req.params


        /*
        *
        * id of product to be deleted
        *
        *
        */
        await productService.deleteProduct(res, id)

    } catch (error) {

        res.send({ error: error.message })
    }
}


module.exports = {
    create,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
};