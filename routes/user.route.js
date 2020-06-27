const userCtl = require('../controllers/user.controller');
const refreshtoken = require('../middleware/refreshtToken.middleware')
module.exports = (app) => {

    app
    .post('/signup', userCtl.signup)
    .post('/login', userCtl.login)
    .post('/refreshtoken',refreshtoken)
    .get('/health',(req,res)=> res.send('server is healthy'))
}