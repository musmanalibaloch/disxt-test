const mongoose = require('mongoose');

module.exports = async () => {
    try {
        
        const url = `mongodb://mongodb:27017/test?authSource=admin`;
        const dbConnection = await mongoose.connect(url, {
            useNewUrlParser: true
        });
        if(dbConnection)
        {
            console.info('connected to db')
        }else{
            console.warn('disconnected')
        }
    } catch (error) {
        throw new Error(error);
    }
}           