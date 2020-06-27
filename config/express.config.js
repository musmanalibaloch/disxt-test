const bodyParser = require('body-parser')

module.exports = (app) =>{
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

}