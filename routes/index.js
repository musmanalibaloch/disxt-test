module.exports = (app) =>{
    require('./user.route')(app)
    require('./product.route')(app)
}