const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
*
*
*   Product schema
*
*/
const productSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    },
    name: { 
        type: String,
        maxlength: 250,
        minlength: 5,
    },
    description: {
        type: String,
        maxlength: 700,
        minlength:20
    },
    price:{
        type: Number,
        max: 5000,
        min: 1
    }
}, {timestamps: true});



module.exports = mongoose.model('productModel', productSchema);
