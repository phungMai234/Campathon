const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const database = require("../database");

const Schema = mongoose.Schema;

const userShema = new Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        required:true
    },
    hash_password:{
        type: String,
        required: true
    },
    created:{
        type:Date
    }
}, {versionKey: false});

userShema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject();
    delete userObject.hash_password;
    return userObject
}
const Users = database.model('Users', userShema);
module.exports = Users;