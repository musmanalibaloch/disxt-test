/*
*
*  Express http framework
*
*/
const express = require('express');


/*
*
*  Load environment variables
*
*/
require('dotenv').config()

/*
*
* Db configuration
*
*/

require('./config/mongoose.config')();

/*
*
* Express instance
*
*/
const app = express();


/*
*
* configure express
*
*/

require('./config/express.config')(app);

require('./routes/index')(app);
/*
*
* Initiate server
*
*/

require('./server')(app);