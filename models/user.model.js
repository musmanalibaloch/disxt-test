
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require("bcryptjs")

/*
*
*
* User schema
*
*/

const UserSchema = new Schema({
    "name": {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    "lastname": {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
    },
    "age": {
        type: Number,
        required: true,
        min: [16, 'Minimum age should be 16'],
        max: [100, 'Maximum age should be 100']

    },
    "role": {
        type: String,
        enum: ['admin', 'client']
    },
    "password": {
        type: String, 
        minlength: 8, 
        maxlength: 25
    },
    "username": { 
        type: String,
        minlength: 8,
        maxlength: 20,
        unique: true,
        index: true,
        lowercase: true
    }
},{timestamps: true})


/*
*
*
* User model
*
*/

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next()
    }
    this.password = Bcrypt.hashSync(this.password, 10)
    next()
})

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('userModel', UserSchema)
