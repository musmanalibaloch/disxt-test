const productCtl = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware')
const roleValidator = require('../middleware/role.middleware')


module.exports = (app) => {

    app
        .post('/product', auth, roleValidator, productCtl.create)
        .get('/product/:id', auth, productCtl.getOneProduct)
        .get('/products', auth, productCtl.getProducts)
        .put('/product/:id', auth, roleValidator, productCtl.updateProduct)
        .delete('product/:id',auth,roleValidator, productCtl.deleteProduct)


}